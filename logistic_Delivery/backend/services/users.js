const { logisticDB, Sequelize } = require("../models");
const user = logisticDB.user;
const roles = logisticDB.roles;
const Op = Sequelize.Op;
const utils = require("../common/utils");
const bcrypt = require("../libs/bcrypt");
const _ = require("lodash");
const moment = require("moment-timezone");

module.exports.addUser = async (req, res, next) => {
  try {
    req.body.created_at = moment()
      .tz("Asia/Ho_Chi_Minh")
      .add(7, "hours")
      .format();

    req.body.password = bcrypt.hash(req.body.password);
    var user = await logisticDB.user.create({
      ...req.body,
    });
    return res.send({ success: true, data: user });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    var query = {};
    if (req.query.role_id != undefined) query.role_id = req.query.role_id;

    if (req.query.page == undefined || req.query.pageSize == undefined) {
      req.query.page = 1;
      req.query.pageSize = 20;
    }

    if (req.query.name != undefined) {
      (query.name = { [Op.like]: `%${req.query.name}%` })
    };
    if (req.query.customer_code != undefined) {
      query.customer_code = { [Op.like]: `%${req.query.customer_code}%` };
    };

    req.query.page = parseInt(req.query.page);
    req.query.pageSize = parseInt(req.query.pageSize);

    var dataUser = await user.findAll({
      where: query,
      include: [logisticDB.debit, logisticDB.effort_price],
      limit: req.query.pageSize,
      offset: req.query.pageSize * (req.query.page - 1),
    });

    var count = await user.count({
      where: query,
    });
    // Sum debits
    for (var i = 0; i < dataUser.length; i++) {
      dataUser[i] = JSON.parse(JSON.stringify(dataUser[i]));
      dataUser[i].sumDebit = _.sumBy(dataUser[i].debits, (o) => {
        return parseFloat(o.cost_remain);
      });
      if (dataUser[i].sumDebit == undefined) dataUser[i].sumDebit = 0;
    }

    res.send({ success: true, count: count, data: dataUser });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.getAllRole = async (req, res, next) => {
  try {
    var dataRole = await roles.findAll({});
    var count = await roles.count({});

    if (req.query.page == undefined || req.query.pageSize == undefined) {
      req.query.page = 1;
      req.query.pageSize = 20;
    }

    req.query.page = parseInt(req.query.page);
    req.query.pageSize = parseInt(req.query.pageSize);

    res.send({ success: true, data: dataRole });
  } catch (err) {
    res.send({ success: false, mess: "Error: " + err });
  }
};

module.exports.updateUser = async (req, res, next) => {
  user
    .update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((responsive) =>
      res.send({
        success: true,
        mess: "Update Success",
        data: req.body,
      })
    )
    .catch((e) => {
      throw new Error(`400:${e}`);
    });
};

module.exports.getuserDetail = async (req, res, next) => {
  try {
    let data = await user.findOne({
      where: {
        id: parseInt(req.query.id),
      },
      include: [logisticDB.debit, logisticDB.effort_price],
    });

    data.sumDebit = _.sumBy(data.debits, (o) => {
      return parseFloat(o.cost_remain);
    });

    if (data.sumDebit == undefined) data.sumDebit = 0;
    delete data.password;
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  if (req.user.role != "admin") {
    next(new Error("400:You haven't permission!"));
  }

  var user = await logisticDB.user.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user == undefined)
    return res.send({ success: false, mess: "User Not Found" });

  const response = await logisticDB.user.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (response != undefined) {
    return res.send({ success: true, mess: "Delete Success" });
  } else {
    return res.send({ success: false, mess: "Delete Faile" });
  }
};

module.exports.getHomeData = async ({ userId }, next) => {
  try {
    const user = await primaryDB.users.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: primaryDB.companies,
          as: "company",
        },
      ],
    });
    const packageList = await secondaryDB.shippingPackageLists.findAll({
      where: {
        userId,
      },
    });
    return {
      company: user.company,
      packageList,
    };
  } catch (error) {
    next(error);
  }
};
