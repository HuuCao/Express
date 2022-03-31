const moment = require("moment-timezone");
const { Sequelize, logisticDB } = require("../models");
const promotion = logisticDB.promotion;
const Op = Sequelize.Op;
const utils = require("../utils/filtertime");
const _ = require("lodash");
var axios = require("axios");
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
const { reject } = require("lodash");
const { userInfo } = require("os");
const {filter} = require("../utils/filtertime");
const { now } = require("moment-timezone");
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;

module.exports.createPromotion = async (req, res, next) => {
    let body = req.body;
    // body.userId = req.user.idUser;

    const countCode = await logisticDB.promotion.count({
      where: {
        promotion_code: body.promotion_code
      },
    });
    if (countCode > 0) {
      throw new Error("400:Username has ben taken");
    }

    var _date = new Date();
    _date.setHours(_date.getHours() + 7);

    var dataPromotion = await promotion
      .create({
        ...body,
        created_at: _date
      })
    var startDate = moment(req.body.time_start).unix();
    var endDate = moment(req.body.time_end).unix();
    var nowDate = moment().unix();

    if(startDate <= endDate){
      if(nowDate >= startDate && nowDate <= endDate) {
        //dang dien ra
        console.log("1");
        await logisticDB.promotion.update(
          {
            status: 'happenning'
          },
          {
            where: {
              id: dataPromotion.id
            },
          }
        );
      return res.send({ success: true, mess: "Successfully!" });
      }
      if(nowDate < startDate){
        console.log("2");
        //sắp diễn ra
        await logisticDB.promotion.update(
          {
            status: 'new'
          },
          {
            where: {
              id: dataPromotion.id
            },
          }
        );
      return res.send({ success: true, mess: "Successfully!" });
      }
      if(nowDate > endDate){
        //đã diễn ra
        console.log("3");
        await logisticDB.promotion.update(
          {
            status: 'finished'
          },
          {
            where: {
              id: dataPromotion.id
            },
          }
        );
      return res.send({ success: true, mess: "Successfully!" });
      }
    }
    else {
      res.send({ success: false, mess: "Thiết lập thời gian không hợp lý" })
    }
    return res.send({ success: true });
};

module.exports.getAllPromotion = async (req, res, next) => {
    try {
      var dataPromotion = await promotion.findAll({});

      if (req.query.customer_code != null) {
          dataPromotion = _.filter(dataPromotion, (o) => {
            if (o.user_id == req.query.user_id) return o;
          });
      }
      if (req.query.promotion_code != null) {
          dataPromotion = _.filter(dataPromotion, (o) => {
            if (o.promotion_code == req.query.promotion_code) return o;
          });
      }
      if (req.query.type != null) {
          dataPromotion = _.filter(dataPromotion, (o) => {
            if (o.type == req.query.type) return o;
          });
      }
      res.send({ success: true, data: dataPromotion })
    }
    catch (err) {
      res.send({ success: false, mess: "Error: " + err })
    }
};

module.exports.updatePromotion = async (req, res, next) => {
    // stt order of User
    var body = req.body;
    try {
        await logisticDB.promotion.update(
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
    } 
    catch (e) {
        res.send({ success: false, mess: "Error: " + e })
    };
};