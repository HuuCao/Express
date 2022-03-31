const moment = require("moment-timezone");
const { Sequelize, logisticDB } = require("../models");
const shipping_partner = logisticDB.shipping_partner;
const _ = require("lodash");
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;


module.exports.createShippingPartner = async (req, res, next) => {
    let body = req.body;
    // body.userId = req.user.idUser;
    const countName = await logisticDB.shipping_partner.count({
        where: { name: body.name },
    });
    if (countName > 0) {
      throw new Error("400: Name has ben taken");
    }

    const totalShippingPartner = await shipping_partner.count({});
    var shipping_partner_code = 10001 + new Number(totalShippingPartner);

    body.is_activate = 1;
    var _date = new Date();
    _date.setHours(_date.getHours()+7);

    shipping_partner
      .create({
        ...body,
        create_at: _date,
        shipping_partner_code: shipping_partner_code
      })
      .then((response) => res.json(response))
      .catch((e) => {
        res.json({
          status: false,
          message: e.message,
        });
      });
};

module.exports.getAllShippingPartner = async (req, res, next) => {
    var data = await shipping_partner.findAll({});
    if (req.query.name != undefined) {
      data = _.filter(data, (o) => {
            if (o.name == undefined) o.name = "";
            if (
            new String(o.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                .toLocaleLowerCase()
                .includes(
                req.query.name
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                )
            )
            return o;
        });
    }
    if (req.query.shipping_partner_code != null) {
        data = _.filter(data, (o) => {
          if (o.shipping_partner_code == req.query.shipping_partner_code) return o;
        });
    }
    if (req.query.tel != null) {
        data = _.filter(data, (o) => {
          if (o.tel == req.query.tel) return o;
        });
    }
    if (req.query.area != null) {
        data = _.filter(data, (o) => {
          if (o.area == req.query.area) return o;
        });
    }
    data = _.reverse(data);
    res.send({ success: true, data: data });
};

module.exports.updateShippingPartner = async (req, res, next) => {
    var body = req.body;
    try {
        await shipping_partner.update(
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
    }
};
