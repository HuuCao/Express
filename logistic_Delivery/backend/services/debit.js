const moment = require("moment-timezone");
const { Sequelize, logisticDB } = require("../models");
const card_io = logisticDB.card_io;
const order = logisticDB.order;
const debit = logisticDB.debit;
const Op = Sequelize.Op;
const utils = require("../utils/filtertime");
const _ = require("lodash");
var axios = require("axios");
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
const { reject, forInRight } = require("lodash");
const { userInfo } = require("os");
const { filter } = require("../utils/filtertime");
const shipping_partner = require("../models/logistic/shipping_partner");
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;

module.exports.getDebitByIdUser = async (req, res, next) => {
  try {
    var dataOrder = await order.findAll({
      where: {
        status_check: "Checking",
        user_id: req.query.user_id,
      },
    });
    res.send({ success: true, data: dataOrder });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getAllDebit = async (req, res, next) => {
  try {
    var query = {};

    if (req.query.page == undefined || req.query.pageSize == undefined) {
      req.query.page = 1;
      req.query.pageSize = 20;
    }
    if (req.query.category != undefined) {
      (query.category = req.query.category)
    };

    if (req.query.name != undefined) {
      (query.name = { [Op.like]: `%${req.query.name}%` })
    };
    if (req.query.type != undefined) {
      query.type = { [Op.like]: `%${req.query.type}%` };
    };

    req.query.page = parseInt(req.query.page);
    req.query.pageSize = parseInt(req.query.pageSize);

    if (req.query.to_day != undefined)
    query.created_at = {
      $gte: moment()
        .tz("Asia/Ho_Chi_Minh")
        .hour(0)
        .minute(0)
        .second(0)
        .format(),
    };
  console.log(query);
  if (req.query.yesterday != undefined)
    query.created_at = {
      $gte: moment()
        .tz("Asia/Ho_Chi_Minh")
        .subtract(1, "day")
        .hour(0)
        .minute(0)
        .second(0)
        .format()
    };

  if (req.query.this_week != undefined)
    query.created_at = {
      $gte: moment()
        .tz("Asia/Ho_Chi_Minh")
        .day(0)
        .hour(0)
        .minute(0)
        .second(0)
        .format(),
    };

  if (req.query.last_week != undefined)
    query.created_at = {
      $gte: moment()
        .tz("Asia/Ho_Chi_Minh")
        .subtract(7, "day")
        .day(1)
        .format(),
      $lt: moment().tz("Asia/Ho_Chi_Minh").day(1).format(),
    };

  if (req.query.this_month != undefined)
    query.created_at = {
      $gte: moment().tz("Asia/Ho_Chi_Minh").date(0).format(),
    };

  if (req.query.last_month != undefined)
    query.created_at = {
      $gte: moment()
        .tz("Asia/Ho_Chi_Minh")
        .subtract(1, "month")
        .date(0)
        .format(),
      $lt: moment().tz("Asia/Ho_Chi_Minh").date(0).format(),
    };

  if (req.query.this_year != undefined) {
    query.created_at = {
      $gte: moment()
        .tz("Asia/Ho_Chi_Minh")
        .month(0)
        .date(0)
        .hour(0)
        .minute(0)
        .second(0)
        .format(),
    };
  }

  if (req.query.last_year != undefined) {
    query.created_at = {
      $gte: moment()
        .tz("Asia/Ho_Chi_Minh")
        .subtract(1, "year")
        .month(0)
        .date(0)
        .hour(0)
        .minute(0)
        .second(0)
        .format(),
      $lt: moment()
        .tz("Asia/Ho_Chi_Minh")
        .month(0)
        .date(0)
        .hour(0)
        .minute(0)
        .second(0)
        .format(),
    };
  }

  if (req.query.startDate != undefined && req.query.endDate != undefined) {
    query.created_at = {
      $gte: moment(req.query.startDate)
        .tz("Asia/Ho_Chi_Minh")
        .hour(0)
        .minute(0)
        .second(0)
        .format(),
      $lt: moment(req.query.endDate)
        .tz("Asia/Ho_Chi_Minh")
        .add(1, "day")
        .hour(0)
        .minute(0)
        .second(0)
        .format(),
    };
  }

    var data = await logisticDB.debit.findAll({
      where: query,
      include: [
        {
          model: logisticDB.card_io,
          include: [
            {
              model: logisticDB.order,
              include: [
                {
                  model: logisticDB.user,
                },
              ],
            },
          ],
        },
        {
          model: logisticDB.user
        },
        {
          model: logisticDB.shipping_partner
        },
      ],
      offset: req.query.pageSize * (req.query.page - 1),
      limit: req.query.pageSize,
    });

    var count = await logisticDB.debit.count({
      where: query,
    });

    res.send({ success: true, count: count, data: data });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.updateDebit = async (req, res, next) => {
  try {
    var body = req.body;
    var dataDebit = await debit.findOne({
      where: {
        id: parseInt(req.params.id)
      }
    })
    console.log(dataDebit.sum_cost);
    if(body.cost_received == dataDebit.sum_cost) {
      await debit.update(
        {
          ...body,
          is_received: 1,
          cost_remain: 0
        },
        {
          where: {
            id: parseInt(req.params.id),
          },
        }
      );
    }
    if(body.cost_received < dataDebit.sum_cost){
      var costRemain = dataDebit.sum_cost - body.cost_received
      await debit.update(
        {
          ...body,
          is_received: 0,
          cost_remain: costRemain
        },
        {
          where: {
            id: parseInt(req.params.id),
          },
        }
      );
    }else {
      await debit.update(
        {
          ...body,
        },
        {
          where: {
            id: parseInt(req.params.id),
          },
        }
      );
    }  
    return res.send({ success: true, data: req.body, mess: "Update success" });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.updateReceived = async (req, res, next) => {
  try {
    var body = req.body;
    console.log(body.data);
    for (var i = 0; i < body.data.length; i++) {
      var dataDebit = await debit.findOne({
        where: {
          id: body.data[i],
        },
      });
      console.log("====================");
      if (dataDebit == null){
        return res.send({
          success: false,
          mess: "Không tìm thấy công nợ",
        });
      }
      else {
        await debit.update(
          {
            is_received: 1
          },
          {
            where: {
              id: body.data[i],
            },
          }
        );
      }
    }
    
    return res.send({ success: true, mess: "Update success" });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getAllDebitCustomer = async (req, res, next) => {
  try {
    var dataUser = await logisticDB.user.findAll({
      where: {
        is_activate: 1,
        role_id: 7,
      },
      include: [
        {
          model: logisticDB.order,
        },
      ],
    });
    dataUser = JSON.parse(JSON.stringify(dataUser)); //dùng khi 1 đối tượng nào đó gắn thêm thuộc tính k được
    for (var i = 0; i < dataUser.length; i++) {
      if (dataUser[i].orders != null) {
        var debitSum = _.sumBy(dataUser[i].orders, (o) => {
          if (o.status_check == "Checking") return o.unit_price;
        });
        dataUser[i].debitSum = debitSum;

        var revenueSum = _.sumBy(dataUser[i].orders, (o) => {
          if (o.status_check == "Checked") return o.unit_price;
        });
        dataUser[i].revenueSum = revenueSum;
        delete dataUser[i].orders;
      }
    }
    dataUser = _.sortBy(dataUser, (o) => {
      return -o.debitSum;
    });

    if (req.query.search != undefined) {
      dataUser = _.filter(dataUser, (o) => {
        // if (o.tel == req.query.search || o.name == req.query.search) return o;
        // if (o.name == undefined) o.name = "";
        if (
          new String(o.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
            .toLocaleLowerCase()
            .includes(
              req.query.search
                .toLocaleLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            ) ||
          new String(o.tel.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
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
    if (req.query.today != null) {
      dataUser = _.filter(dataUser, (o) => {
        if (
          moment(o.created_at).format("YYYY/MM/DD").toString() ===
          moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD").toString()
        )
          return o;
      });
    }
    if (req.query.yesterday != null) {
      dataUser = _.filter(dataUser, (o) => {
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
      dataUser = _.filter(dataUser, (o) => {
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
      dataUser = _.filter(dataUser, (o) => {
        if (
          moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix() >=
            moment(o.created_at).unix() &&
          moment(o.created_at).unix() >=
            moment()
              .tz("Asia/Ho_Chi_Minh")
              .subtract(7, "days")
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
      dataUser = _.filter(dataUser, (o) => {
        if (moment(o.created_at).format("MM") == month) return o;
      });
    }
    if (req.query.last_month != null) {
      var month = moment()
        .subtract(1, "months")
        .tz("Asia/Ho_Chi_Minh")
        .format("MM");
      dataUser = _.filter(dataUser, (o) => {
        if (moment(o.created_at).format("MM") == month) return o;
      });
    }
    if (req.query.this_year != null) {
      var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY");
      dataUser = _.filter(dataUser, (o) => {
        if (moment(o.created_at).format("YYYY") == year) return o;
      });
    }
    if (req.query.last_year != null) {
      var year = moment()
        .tz("Asia/Ho_Chi_Minh")
        .subtract(1, "year")
        .format("YYYY");
      dataUser = _.filter(dataUser, (o) => {
        if (moment(o.created_at).format("YYYY") == year) return o;
      });
    }
    if (req.query.startDate != undefined && req.query.endDate != undefined) {
      var endDate = moment(req.query.endDate).add(1, "days");
      dataUser = _.filter(dataUser, (o) => {
        if (
          moment(o.created_at).unix() <= endDate.unix() &&
          moment(o.created_at).unix() >= moment(req.query.startDate).unix()
        ) {
          return o;
        }
      });
    }

    res.send({ success: true, data: dataUser });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getDebitByTime = async (req, res, next) => {
  var dataOrder = await user.findAll({
    where: {
      status_check: "Checking",
    },
  });

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
  if (req.query.this_week != null) {
    dataOrder = _.filter(dataOrder, (o) => {
      if (
        moment(o.created_at).unix() >=
        moment().tz("Asia/Ho_Chi_Minh").day(1).hour(0).minute(0).unix()
      )
        return o;
    });
  }
  if (req.query.last_week != null) {
    dataOrder = _.filter(dataOrder, (o) => {
      if (
        moment().tz("Asia/Ho_Chi_Minh").day(0).hour(0).minute(0).unix() >=
          moment(o.created_at).unix() &&
        moment(o.created_at).unix() >=
          moment()
            .tz("Asia/Ho_Chi_Minh")
            .subtract(7)
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

module.exports.getDebitByIdShipping = async (req, res, next) => {
  try {
    var data = await logisticDB.debit.findAll({
      include: [
        {
          model: logisticDB.card_io,
          include: [
            {
              model: logisticDB.order,
              include: [
                {
                  model: logisticDB.user,
                },
              ],
            },
          ],
        },
        {
          model: logisticDB.user
        },
      ],
      // offset: req.query.pageSize * (req.query.page - 1),
      // limit: req.query.pageSize,
    });
    res.send({ success: true, data: data });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getTotalCharge = async (req, res, next) => {
  try {
    var data = await logisticDB.user.findAll({
      include: [
        {
          model: logisticDB.order,
        },
      ],
    });

    var _data = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].orders != null) {
        var costSum = _.sumBy(data[i].orders, (o) => {
          return (o.surcharge + o.unit_price) * o.weight + o.other_cost;
        });
        data[i].costSum = costSum;
        _data.push(costSum);
      } else {
        var costSum = 0;
        data[i].costSum = costSum;
        _data.push(data[i].costSum);
      }
    }
    res.send({ success: true, data: _data });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};
