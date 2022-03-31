const moment = require("moment-timezone");
const { Sequelize, logisticDB } = require("../models");
const order = logisticDB.order;
const _ = require("lodash");
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;

module.exports.createOrder = async (req, res, next) => {
  let body = req.body;
  body.user_id = req.user.id;
  // body.userId = req.user.idUser;
  const countBill = await logisticDB.order.count({
    where: {
      code_bill: body.code_bill,
    },
  });
  if (countBill > 0) {
    return res.send({ success: false, mess: "code_bill already" });
  }

  var _date = moment().tz("Asia/Ho_Chi_Minh").add(7, "hours").format();
  body.created_at = _date;

  // caculate unit_price
  if (body.customer_code == undefined)
    return res.send({ success: false, mess: "Not found customer_code" });

  var customer = await logisticDB.user.findOne({
    where: {
      customer_code: body.customer_code,
    },
  });

  if (customer == undefined)
    return res.send({ success: false, mess: "Not found customer_code" });

  var shipping_partner = await logisticDB.shipping_partner.findOne({
    where: {
      id: body.shipping_partner_id
    }
  });

  if (shipping_partner == null)
  return res.send({
    success: false,
    mess: "Not Found Shipping Partner",
  });

  if (shipping_partner.area == "Inland")
  return res.send({
    success: false,
    mess: "Shipping area must be international!",
  });

  if (shipping_partner.area == "International") {
    if (shipping_partner.debit) shipping_partner = 0;
    shipping_partner.debit += req.body.cost_origin;

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
      description: "Phí vận chuyển quốc tế",
      category: "International",
      id_card: 0,
      sum_cost: req.body.cost_origin,
      cost_remain: req.body.cost_origin,
      cost_received: 0,
    });
  }

  body.user_id = customer.id;

  var effort_price = await logisticDB.effort_price.findOne({
    where: {
      id: parseInt(customer.effort_price_id),
    },
    include: [logisticDB.effort_price_package],
  });

  if (effort_price == undefined) {
    // Lấy gói mặc định nếu bug khách hàng không có CT tính giá
    effort_price = await logisticDB.effort_price.findOne({
      where: {
        id: 1,
      },
      include: [logisticDB.effort_price_package],
    });
  }

  if (effort_price == undefined)
    return res.send({ success: false.valueOf, mess: "Bug Effort Price" });

  var unit_price = 0;
  for (var i = 0; i < effort_price.effort_price_packages.length; i++) {
    // check condition
    if (
      effort_price.effort_price_packages[i].condition_miximum_kg <= body.mass &&
      effort_price.effort_price_packages[i].condition_maximum_kg >= body.mass
    ) {
      var cost_mass =
        effort_price.effort_price_packages[i].cost_per_kg * body.mass;
      var cost_volume =
        effort_price.effort_price_packages[i].cost_per_m3 * body.volume;

      if (cost_mass >= cost_volume) {
        unit_price = cost_mass;
      } else {
        unit_price = cost_volume;
      }
      break;
    }
  }

  if (unit_price == 0) {
    return res.send({
      success: false,
      mesS: "Not found effort_price suitable",
    });
  }

  body.unit_price = unit_price;

  await order
    .create({
      ...body,
    })
    .then((response) => {
      res.send({ success: true, data: response, mess: "Successfully!" });
    })
    .catch((e) => {
      res.json({
        status: false,
        message: e.message,
      });
    });
};

module.exports.updateOrder = async (req, res, next) => {
  var body = req.body;

  if (req.body.customer_code != undefined) {
    var user = await logisticDB.user.findOne({
      where: {
        customer_code: req.body.customer_code,
      },
    });
    if (user == undefined)
      return res.send({
        success: false,
        mess: "customer_code not found",
      });
    body.user_id = user.id;
  }

  try {
    await logisticDB.order.update(
      {
        ...body,
      },
      {
        where: {
          id: parseInt(req.params.id),
        },
      }
    );
    return res.send({ success: true, mess: "Update success" });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getAllOrder = async (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      var dataOrder = await order.findAll({
        where: {
          is_activate: 1
        },
        include: [logisticDB.user],
        order: [["created_at", "DESC"]],
      });

      if (req.query.status_check != undefined) {
        var dataOrder = _.filter(dataOrder, (o) => {
          if (o.status_check == req.query.status_check) return o;
        });
      }

      if (req.query.order_status != undefined) {
        var dataOrder = _.filter(dataOrder, (o) => {
          if (o.order_status == req.query.order_status) return o;
        });
      }

      if (req.query.search != undefined) {
        dataOrder = _.filter(dataOrder, (o) => {
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

      if (req.query.id_customer != undefined) {
        dataOrder = _.filter(dataOrder, (o) => {
          if (o.user_id == req.query.id_customer) return o;
        });
      }
      if (req.query.today != null) {
        dataOrder = _.filter(dataOrder, (o) => {
          if (
            moment(o.created_at).format("YYYY/MM/DD").toString() ===
            moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
          )
            return o;
        });
      }
      if (req.query.yesterday != null) {
        dataOrder = _.filter(dataOrder, (o) => {
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
        dataOrder = _.filter(dataOrder, (o) => {
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
        dataOrder = _.filter(dataOrder, (o) => {
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
      if (req.query.this_month != null) {
        var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("MM") == month) return o;
        });
      }
      if (req.query.last_month != null) {
        var month = moment()
          .subtract(1, "months")
          .tz("Asia/Ho_Chi_Minh")
          .format("MM");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("MM") == month) return o;
        });
      }
      if (req.query.this_year != null) {
        var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("YYYY") == year) return o;
        });
      }
      if (req.query.last_year != null) {
        var year = moment()
          .tz("Asia/Ho_Chi_Minh")
          .subtract(1, "year")
          .format("YYYY");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("YYYY") == year) return o;
        });
      }
      if (req.query.startDate != undefined && req.query.endDate != undefined) {
        var endDate = moment(req.query.endDate).add(1, "day");
        dataOrder = _.filter(dataOrder, (o) => {
          if (
            moment(o.created_at).unix() <= endDate.unix() &&
            moment(o.created_at).unix() >= moment(req.query.startDate).unix()
          ) {
            return o;
          }
        });
      }
      dataOrder = _.reverse(dataOrder);
      res.send({ success: true, data: dataOrder });
    }

    if (req.user.role == "customer") {
      var dataOrder = await order.findAll({
        where: {
          user_id: req.user.user_id,
          is_activate: 1
        },
      });
      if (req.query.status_check != undefined) {
        var dataOrder = _.filter(dataOrder, (o) => {
          if (o.status_check == req.query.status_check) return o;
        });
      }
      if (req.query.customer_name != undefined) {
        var dataOrder = _.filter(dataOrder, (o) => {
          if (o.customer_name == req.query.customer_name) return o;
        });
      }
      if (req.query.customer_code != undefined) {
        dataOrder = _.filter(dataOrder, (o) => {
          if (o.user.customer_code == undefined) o.user.customer_code = "";
          if (
            new String(
              o.user.customer_code.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
              .toLocaleLowerCase()
              .includes(
                req.query.customer_code
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          )
            return o;
        });
      }

      if (req.query.today != null) {
        dataOrder = _.filter(dataOrder, (o) => {
          if (
            moment(o.created_at).format("YYYY/MM/DD").toString() ===
            moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
          )
            return o;
        });
      }
      if (req.query.yesterday != null) {
        dataOrder = _.filter(dataOrder, (o) => {
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
        dataOrder = _.filter(dataOrder, (o) => {
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
        dataOrder = _.filter(dataOrder, (o) => {
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
      if (req.query.this_month != null) {
        var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("MM") == month) return o;
        });
      }
      if (req.query.last_month != null) {
        var month = moment()
          .subtract(1, "months")
          .tz("Asia/Ho_Chi_Minh")
          .format("MM");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("MM") == month) return o;
        });
      }
      if (req.query.this_year != null) {
        var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("YYYY") == year) return o;
        });
      }
      if (req.query.last_year != null) {
        var year = moment()
          .tz("Asia/Ho_Chi_Minh")
          .subtract(1, "year")
          .format("YYYY");
        dataOrder = _.filter(dataOrder, (o) => {
          if (moment(o.created_at).format("YYYY") == year) return o;
        });
      }
      if (req.query.startDate != undefined && req.query.endDate != undefined) {
        var endDate = moment(req.query.endDate).add(1, "day");
        dataOrder = _.filter(dataOrder, (o) => {
          if (
            moment(o.created_at).unix() <= endDate.unix() &&
            moment(o.created_at).unix() >= moment(req.query.startDate).unix()
          ) {
            return o;
          }
        });
      }
      dataOrder = _.reverse(dataOrder);
      res.send({ success: true, data: dataOrder });
    }
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getOrderByCustomerName = async (req, res, next) => {
  var dataOrder = await order.findAll({
    where: {
      customer_name: req.body.customer_name,
    },
  });
  // if (req.body.name != undefined) {
  //   var dataOrder = _.filter(dataOrder, (o) => {
  //     if (o.name == req.body.name) return o;
  //   });
  // }
  dataOrder = _.reverse(dataOrder);
  res.send({ success: true, data: dataOrder });
};

module.exports.getOrderByIdShippingPartner = async (req, res, next) => {
  var dataOrder = await order.findAll({
    where: {
      shipping_partner_id: req.query.shipping_partner_id,
    },
  });
  dataOrder = _.reverse(dataOrder);
  res.send({ success: true, data: dataOrder });
};

module.exports.getOrderByDates = async (req, res, next) => {
  var dataOrder = await order.findAll({});
  if (req.query.today != null) {
    dataOrder = _.filter(dataOrder, (o) => {
      if (
        moment(o.created_at).format("YYYY/MM/DD").toString() ===
        moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
      )
        return o;
    });
  }
  if (req.query.yesterday != null) {
    dataOrder = _.filter(dataOrder, (o) => {
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
    dataOrder = _.filter(dataOrder, (o) => {
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
    dataOrder = _.filter(dataOrder, (o) => {
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
  if (req.query.this_month != null) {
    var month = moment().tz("Asia/Ho_Chi_Minh").format("MM");
    dataOrder = _.filter(dataOrder, (o) => {
      if (moment(o.created_at).format("MM") == month) return o;
    });
  }
  if (req.query.last_month != null) {
    var month = moment()
      .subtract(1, "months")
      .tz("Asia/Ho_Chi_Minh")
      .format("MM");
    dataOrder = _.filter(dataOrder, (o) => {
      if (moment(o.created_at).format("MM") == month) return o;
    });
  }
  if (req.query.this_year != null) {
    var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
    dataOrder = _.filter(dataOrder, (o) => {
      if (moment(o.created_at).format("YYYY") == year) return o;
    });
  }
  if (req.query.last_year != null) {
    var year = moment()
      .tz("Asia/Ho_Chi_Minh")
      .subtract(1, "year")
      .format("YYYY");
    dataOrder = _.filter(dataOrder, (o) => {
      if (moment(o.created_at).format("YYYY") == year) return o;
    });
  }
  if (req.query.startDate != undefined && req.query.endDate != undefined) {
    var endDate = moment(req.query.endDate).add(1, "day");
    dataOrder = _.filter(dataOrder, (o) => {
      if (
        moment(o.created_at).unix() <= endDate.unix() &&
        moment(o.created_at).unix() >= moment(req.query.startDate).unix()
      ) {
        return o;
      }
    });
  }
  dataOrder = _.reverse(dataOrder);

  res.send({ success: true, data: dataOrder });
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    await logisticDB.order.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    }
    );
    return res.send({ success: true, mess: "Deleted!" });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};