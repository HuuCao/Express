const moment = require("moment-timezone");
const { Sequelize, logisticDB } = require("../models");
const _ = require("lodash");
const timezone = "Asia/Ho_Chi_Minh";
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;

module.exports.createEffortPrice = async (req, res, next) => {
  let body = req.body;

  var effort_price_packages = body.effort_price_packages;

  delete body.effort_price_packages;
  var effort_price_new = await logisticDB.effort_price.create({
    ...body,
    created_at: moment().tz(timezone).add(7, "hours").format(),
  });

  effort_price_new = JSON.parse(JSON.stringify(effort_price_new));

  effort_price_new.effort_price_packages = [];
  console.log(effort_price_packages);
  for (var i = 0; i < effort_price_packages.length; i++) {
    effort_price_packages[i].effort_price_id = effort_price_new.id;
    var item = await logisticDB.effort_price_package.create({
      ...effort_price_packages[i],
      created_at: moment().tz(timezone).add(7, "hours").format(),
    });

    effort_price_new.effort_price_packages.push(item);
  }

  return res.send({
    success: true,
    mess: "Created Success",
    data: effort_price_new,
  });
};

module.exports.getAllEffortPrice = async (req, res, next) => {
  var query = {};
  if (req.query.type_cal != null) {
    query.type_cal = req.query.type_cal;
  }

  var data = await logisticDB.effort_price.findAll({
    where: query,
    include: [logisticDB.effort_price_package],
  });
  var count = data.length;

  res.send({ success: true, count: count, data: data });
};

module.exports.getOneEffortPrice = async (req, res, next) => {
  var query = {
    id: parseInt(req.query.id),
  };

  var data = await logisticDB.effort_price.findOne({
    where: query,
    include: [logisticDB.effort_price_package],
  });

  res.send({ success: true, data: data });
};

module.exports.updateEffortPrice = async (req, res, next) => {
  var body = req.body;
  body.modified_at = moment().tz(timezone).add(7, "hours").format();

  var effort_price_packages = body.effort_price_packages;

  delete body.effort_price_packages;

  try {
    // Update Effort Price
    await logisticDB.effort_price.update(
      {
        ...body,
      },
      {
        where: {
          id: parseInt(req.params.id),
        },
      }
    );

    // Update Effort Price Package
    for (var i = 0; i < effort_price_packages.length; i++) {
      if (effort_price_packages[i].id == undefined) {
        effort_price_packages[i].effort_price_id = req.params.id;
        await logisticDB.effort_price_package.create(effort_price_packages[i]);
      }

      await logisticDB.effort_price_package.update(
        { ...effort_price_packages[i] },
        {
          where: {
            id: parseInt(effort_price_packages[i].id),
          },
        }
      );
    }

    return res.send({ success: true, mess: "Update success" });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.removeEffortPricePkg = async (req, res, next) => {
  try {
    // Update Effort Price
    var package_price = await logisticDB.effort_price_package.findOne({
      where: {
        id: parseInt(req.body.id),
        effort_price_id: parseInt(req.body.effort_price_id),
      },
    });
    if (package_price == undefined)
      return res.send({
        success: false,
        mess: "Not found package effort price",
      });

    await logisticDB.effort_price_package.destroy({
      where: {
        id: parseInt(req.body.id),
        effort_price_id: parseInt(req.body.effort_price_id),
      },
    });

    return res.send({ success: true, mess: "Delete success" });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.removeEffortPrice = async (req, res, next) => {
  try {
    // Remove All Package In Effort Price
    await logisticDB.effort_price_package.destroy({
      where: {
        effort_price_id: parseInt(req.params.id),
      },
    });

    // Update Effort Price
    await logisticDB.effort_price.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    return res.send({ success: true, mess: "Delete success" });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};
