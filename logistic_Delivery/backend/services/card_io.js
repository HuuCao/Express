const moment = require("moment-timezone");
const { Sequelize, logisticDB } = require("../models");
const card_io = logisticDB.card_io;
const order = logisticDB.order;
const card_io_order = logisticDB.card_io_order;
const shipping_partner = logisticDB.shipping_partner;
const _ = require("lodash");
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
const { flatMap } = require("lodash");
const user = require("../models/logistic/user");
// const shipping_partner = require("../models/logistic/shipping_partner");
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;

module.exports.createCardIn = async (req, res, next) => {
  try {
    let body = req.body;

    var getDate = moment().format("DDMMYY");
    var _countImport = await card_io.count({
      where: {
        sub_code: "NK-" + getDate,
      },
    });
    var _card_io = await card_io.create({
      ...body,
      sub_code: "NK-" + getDate,
      code: "NK-" + getDate + "-" + parseInt(_countImport + 1),
    });

    if (body.id_shipping == undefined) {
      return res.send({
        success: false,
        mess: "Please Send id_shipping",
      });
    }

    var shipping_partner = await logisticDB.shipping_partner.findOne({
      id: body.id_shipping,
    });

    if (body.cost_import == null)
      return res.send({
        success: false,
        mess: "Please send cost_import",
      });

    if (body.created_at == null)
      return res.send({
        success: false,
        mess: "Please send created_at",
      });

    if (body.type != "import")
      return res.send({
        success: false,
        mess: "Please send type import",
      });

    if (shipping_partner == null)
      return res.send({
        success: false,
        mess: "Not Found Shipping Partner",
      });

    if (body.is_activate == null)
      return res.send({
        success: false,
        mess: "Please pass params is_activate",
      });
    if (body.is_activate) {
      if (shipping_partner.debit == null) shipping_partner = 0;
      shipping_partner.debit += req.body.cost_import;

      // update debit shipping partner
      await logisticDB.shipping_partner.update(
        {
          debit: shipping_partner.debit,
        },
        {
          where: {
            id: shipping_partner.id,
          },
        }
      );

      await logisticDB.debit.create({
        description: "Phí Nhập Kho",
        category: "Customer",
        id_card: _card_io.id,
        sum_cost: req.body.cost_import,
        cost_remain: req.body.cost_import,
        cost_received: 0,
      });
    }

    var _orders = [];
    for (var i = 0; i < body.data.length; i++) {
      var dataOrder = await order.findOne({
        where: {
          order_status: "StackCar",
          id: body.data[i].id,
        },
      });

      if (dataOrder == undefined) {
        return res.send({
          success: false,
          mess: "Không tìm thấy đơn hàng hoặc đơn hàng đã được nhập kho!",
        });
      } else {
        _orders.push(dataOrder);
      }

      if (dataOrder.total_quantity_package < body.data[i].num) {
        return res.send({
          success: false,
          mess: `Đơn hàng ID ${dataOrder.code_bill} vượt quá số lượng`,
        });
      }

      await order.update(
        {
          order_status: "Cameback",
          amount_import_package: body.data[i].num,
          card_in_out: _card_io.id,
          type_card:"import"
        },
        {
          where: {
            id: body.data[i].id,
          },
        }
      );
      // console.log("abc");
      await card_io.update(
        {
          amount_import_package: body.data[i].num,
        },
        {
          where: {
            id: _card_io.id,
          },
        }
      );
      // console.log("update thành công");
    }

    res.send({ success: true, mess: "Successfully!" });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getAllCarIO = async (req, res, next) => {
  try {
    var all_card_io = await card_io.findAll({
      include: order,
    });

    var count = await card_io.count({});

    return res.send({ success: true, count: count, data: all_card_io });
  } catch (err) {
    return res.status(500).send({ success: false, mess: err });
  }
};

module.exports.createCardOut = async (req, res, next) => {
  try {
    let body = req.body;
    // var _date = new Date();
    // _date.setHours(_date.getHours() + 7);
    var getDate = moment().format("DDMMYY");
    var _countExport = await card_io.count({
      where: {
        sub_code: "XK-" + getDate,
      },
    });
    var _card_io = await card_io.create({
      ...body,
      sub_code: "XK-" + getDate,
      code: "XK-" + getDate + "-" + parseInt(_countExport + 1),
      // created_at: _date,
    });

    if (body.type != "export")
      return res.send({
        success: false,
        mess: "Please pass type export",
      });

    if (body.id_customer == undefined) {
      return res.send({
        success: false,
        mess: "Please Send id_customer",
      });
    }

    if (req.body.cost_export == null)
      return res.send({
        success: false,
        mess: "Please pass params cost_export",
      });

    if (body.is_activate == null)
      return res.send({
        success: false,
        mess: "Please pass params is_activate",
      });

    var customer = await logisticDB.user.findOne({
      where: {
        id: body.id_customer,
        role_id: 7,
      },
    });

    if (customer == null)
      return res.send({
        success: false,
        mess: "Not Found Customer",
      });

      var shipping_partner = await logisticDB.shipping_partner.findOne({
        where: {
          id: body.id_shipping
        }
      });

      if (shipping_partner == null)
      return res.send({
        success: false,
        mess: "Not Found Shipping Partner",
      });

      if (shipping_partner.area == "International")
      return res.send({
        success: false,
        mess: "Shipping area must be Inland!",
      });
    
      if (shipping_partner.area == "Inland") {
        if (shipping_partner.debit) shipping_partner = 0;
        shipping_partner.debit += (req.body.sub_cost + req.body.cost_export);

        await logisticDB.shipping_partner.update(
          {
            debit: shipping_partner.debit,
          },
          {
            where: {
              id: shipping_partner.id,
            },
          }
        );
        console.log("Update debit shipping success!");
    
        await logisticDB.debit.create({
          description: "Phí vận chuyển nội địa",
          category: "Inland",
          id_card: _card_io.id,
          sum_cost: req.body.sub_cost + req.body.cost_export,
          cost_remain: req.body.sub_cost + req.body.cost_export,
          cost_received: 0,
        });
      }

    var _orders = [];
    for (var i = 0; i < body.data.length; i++) {
      var dataOrder = await order.findOne({
        where: {
          id: body.data[i].id,
          order_status: "Cameback",
        },
      });

      if (dataOrder == undefined) {
        return res.send({
          success: false,
          mess: "Không tìm thấy đơn hàng hoặc đã xuất kho !",
        });
      } else {
        _orders.push(dataOrder);
      }

      await order.update(
        {
          order_status: "Delivery",
          card_in_out: _card_io.id,
          type_card: "export",
        },
        {
          where: {
            id: body.data[i].id,
          },
        }
      );
    }

    if (req.body.is_activate) {
      if (customer.debit == null) customer.sum_debit = 0;
      customer.sum_debit += req.body.cost_export;

      // update debit shipping partner
      await logisticDB.user.update(
        {
          sum_debit: customer.sum_debit,
        },
        {
          where: {
            id: customer.id,
          },
        }
      );

      await logisticDB.debit.create({
        description: "Phí Xuất Kho",
        category: "Customer",
        id_card: _card_io.id,
        sum_cost: req.body.cost_export,
        cost_remain: req.body.cost_export,
        cost_received: 0,
      });
    }

    res.send({ success: true, mess: "Successfully!" });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.updateCard = async (req, res, next) => {
  // stt order of User
  var body = req.body;
  var data = body.data;
  delete body.data;

  try {
    // Update Order

    if (data != undefined) {
      for (var i = 0; i < data.length; i++) {
        var order = await logisticDB.order.findOne({
          where: {
            id: data[i].id,
          },
        });
        if (order.total_quantity_package < data[i].num)
          return res.send({
            success: false,
            mess: `Bill ID ${order.code_bill} vượt quá số lượng !`,
          });

        await logisticDB.order.update(
          {
            ...data[i],
          },
          {
            where: {
              id: data[i].id,
            },
          }
        );
      }
    }

    var card_io_current = await logisticDB.card_io.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (
      req.body.is_activate &&
      card_io_current.type == "export" &&
      !card_io_current.is_activate
    ) {
      var customer = await logisticDB.user.findOne({
        where: {
          id: card_io_current.id_customer,
        },
      });

      if (customer.debit == null) customer.sum_debit = 0;
      customer.sum_debit += req.body.cost_export;

      // update debit shipping partner
      await logisticDB.user.update(
        {
          sum_debit: customer.sum_debit,
        },
        {
          where: {
            id: customer.id,
          },
        }
      );

      await logisticDB.debit.create({
        description: "Phí Xuất Kho",
        id_card: card_io_current.id,
      });
    }

    if (
      req.body.is_activate &&
      card_io_current.type == "import" &&
      !card_io_current.id_activate
    ) {
      var shipping_partner = await logisticDB.shipping_partner.findOne({
        id: card_io_current.id_shipping,
      });

      if (shipping_partner.debit == null) shipping_partner = 0;
      shipping_partner.debit += req.body.cost_import;

      // update debit shipping partner
      await logisticDB.shipping_partner.update(
        {
          debit: shipping_partner.debit,
        },
        {
          where: {
            id: shipping_partner.id,
          },
        }
      );

      await logisticDB.debit.create({
        description: "Phí Nhập Kho",
        id_card: card_io_current.id,
      });
    }

    // Update Card IO
    await logisticDB.card_io.update(
      {
        ...body,
      },
      {
        where: {
          id: parseInt(req.params.id),
        },
      }
    );

    return res.send({ success: true, data: req.body, mess: "Update success" });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getAllCard = async (req, res, next) => {
  try {
    // var query = {};

    // if (req.query.type != undefined)
    //   query.type = req.query.type;
    // if (req.query.id_shipping != undefined)
    //   query.id_shipping = req.query.id_shipping;
    // if (req.query.id_customer != undefined)
    //   query.id_customer = req.query.id_customer;

    var dataCard = await card_io.findAll({
      include: [
        {
          model: order
        },
        {
          model: shipping_partner
        },
        {
          model: logisticDB.user
        },
      ],
    });

    if (req.query.today != undefined) {
      dataCard = _.filter(dataCard, (o) => {
        if (
          moment(o.created_at).format("YYYY/MM/DD").toString() ===
          moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
        )
          return o;
      });
    }
    if (req.query.yesterday != undefined) {
      dataCard = _.filter(dataCard, (o) => {
        if (
          moment(o.created_at).format("YYYY-MM-DD").toString() ===
          moment()
            .subtract(1, "days")
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD")
            .toString()
        )
          return o;
      });
    }
    if (req.query.this_week != undefined) {
      dataCard = _.filter(dataCard, (o) => {
        if (moment().tz("Asia/Ho_Chi_Minh").day() == 0) {
          if (
            moment(o.created_at).unix() >=
            moment()
              .tz("Asia/Ho_Chi_Minh")
              .subtract(1, "days")
              .day(1)
              .hour(0)
              .minute(0)
              .unix()
          )
            return o;
        } else {
          if (
            moment(o.created_at).unix() >=
            moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
          )
            return o;
        }
      });
    }
    if (req.query.last_week != undefined) {
      dataCard = _.filter(dataCard, (o) => {
        if (
          moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
            moment(o.created_at).unix() &&
          moment(o.created_at).unix() >=
            moment()
              .tz("Asia/Ho_Chi_Minh")
              .subtract(7, "day")
              .day(1)
              .hour(0)
              .minute(0)
              .unix()
        )
          return o;
      });
    }
    if (req.query.this_month != undefined) {
      var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
      dataCard = _.filter(dataCard, (o) => {
        if (moment(o.created_at).format("MM") == month) return o;
      });
    }
    if (req.query.last_month != undefined) {
      var month = moment()
        .subtract(1, "months")
        .tz("Asia/Ho_Chi_Minh")
        .format("MM");
      dataCard = _.filter(dataCard, (o) => {
        if (moment(o.created_at).format("MM") == month) return o;
      });
    }
    if (req.query.this_year != undefined) {
      var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
      dataCard = _.filter(dataCard, (o) => {
        if (moment(o.created_at).format("YYYY") == year) return o;
      });
    }
    if (req.query.last_year != undefined) {
      var year = moment()
        .tz("Asia/Ho_Chi_Minh")
        .subtract(1, "year")
        .format("YYYY");
      dataCard = _.filter(dataCard, (o) => {
        if (moment(o.created_at).format("YYYY") == year) return o;
      });
    }
    if (req.query.startDate != undefined && req.query.endDate != undefined) {
      var endDate = moment(req.query.endDate).add(1, "day");
      dataCard = _.filter(dataCard, (o) => {
        if (
          moment(o.created_at).unix() <= endDate.unix() &&
          moment(o.created_at).unix() >= moment(req.query.startDate).unix()
        ) {
          return o;
        }
      });
    }
    // console.log(dataCard);
    if (req.query.search != undefined) {
      dataCard = _.filter(dataCard, (o) => {
        if (o.user.customer_code == undefined) o.user.customer_code = "";
        if (
          new String(
            o.user.customer_code.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          )
            .toLocaleLowerCase()
            .includes(
              req.query.search
                .toLocaleLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
        )
          return o;
      });
    }

    if (req.query.type != null) {
      dataCard = _.filter(dataCard, (o) => {
        if (o.type == req.query.type) return o;
      });
    }

    dataCard = _.sortBy(dataCard, (o) => {
      return moment(o.created_at).unix();
    });
    // dataCard = _.reverse(dataCard);

    res.send({ success: true, data: dataCard });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getOrderInventory = async (req, res, next) => {
  try {
    var orderInventory = await order.findAll({
      where: {
        order_status: "CameBack"
      },
      include: [
        {
          model: logisticDB.user
        },
        {
          model: logisticDB.card_io
        },
      ],
    });

    if (req.query.today != undefined) {
      orderInventory = _.filter(orderInventory, (o) => {
        if (
          moment(o.created_at).format("YYYY/MM/DD").toString() ===
          moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
        )
          return o;
      });
    }
    if (req.query.yesterday != undefined) {
      orderInventory = _.filter(orderInventory, (o) => {
        if (
          moment(o.created_at).format("YYYY-MM-DD").toString() ===
          moment()
            .subtract(1, "days")
            .tz("Asia/Ho_Chi_Minh")
            .format("YYYY-MM-DD")
            .toString()
        )
          return o;
      });
    }
    if (req.query.this_week != undefined) {
      orderInventory = _.filter(orderInventory, (o) => {
        if (moment().tz("Asia/Ho_Chi_Minh").day() == 0) {
          if (
            moment(o.created_at).unix() >=
            moment()
              .tz("Asia/Ho_Chi_Minh")
              .subtract(1, "days")
              .day(1)
              .hour(0)
              .minute(0)
              .unix()
          )
            return o;
        } else {
          if (
            moment(o.created_at).unix() >=
            moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
          )
            return o;
        }
      });
    }
    if (req.query.last_week != undefined) {
      orderInventory = _.filter(orderInventory, (o) => {
        if (
          moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
            moment(o.created_at).unix() &&
          moment(o.created_at).unix() >=
            moment()
              .tz("Asia/Ho_Chi_Minh")
              .subtract(7, "day")
              .day(1)
              .hour(0)
              .minute(0)
              .unix()
        )
          return o;
      });
    }
    if (req.query.this_month != undefined) {
      var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
      orderInventory = _.filter(orderInventory, (o) => {
        if (moment(o.created_at).format("MM") == month) return o;
      });
    }
    if (req.query.last_month != undefined) {
      var month = moment()
        .subtract(1, "months")
        .tz("Asia/Ho_Chi_Minh")
        .format("MM");
        orderInventory = _.filter(orderInventory, (o) => {
        if (moment(o.created_at).format("MM") == month) return o;
      });
    }
    if (req.query.this_year != undefined) {
      var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
      orderInventory = _.filter(orderInventory, (o) => {
        if (moment(o.created_at).format("YYYY") == year) return o;
      });
    }
    if (req.query.last_year != undefined) {
      var year = moment()
        .tz("Asia/Ho_Chi_Minh")
        .subtract(1, "year")
        .format("YYYY");
        orderInventory = _.filter(orderInventory, (o) => {
        if (moment(o.created_at).format("YYYY") == year) return o;
      });
    }
    if (req.query.startDate != undefined && req.query.endDate != undefined) {
      var endDate = moment(req.query.endDate).add(1, "day");
      orderInventory = _.filter(orderInventory, (o) => {
        if (
          moment(o.created_at).unix() <= endDate.unix() &&
          moment(o.created_at).unix() >= moment(req.query.startDate).unix()
        ) {
          return o;
        }
      });
    }

    orderInventory = _.sortBy(orderInventory, (o) => {
      return moment(o.created_at).unix();
    });
    // dataCard = _.reverse(dataCard);

    res.send({ success: true, data: orderInventory });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};
