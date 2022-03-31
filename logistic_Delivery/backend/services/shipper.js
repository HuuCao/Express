const { logisticDB } = require("../models");
const user = logisticDB.user;
const package_user = logisticDB.package_user;
const packages = logisticDB.packages;
const warehouse_package = logisticDB.warehouse_package;
const fee = logisticDB.fee;
const _ = require("lodash");

module.exports.getAllShipper = async (req, res, next) => {

    var shippers = await logisticDB.shipper.findAll({});

    return res.send({success:true,data:shippers});
}

module.exports.getAllShipperByCompanyId = (req, res, next) => {
  if (req.query.id_company != undefined) {
    user
      .findAll({
        where: {
          roleId: 6,
          companyId: req.query.id_company,
        },
        include: [package_user],
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });
        res.send(responsive);
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  } else {
    user
      .findAll({
        where: {
          roleId: 6,
        },
        include: [package_user],
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });
        res.send(responsive);
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  }
};

module.exports.getAllShipperByWhId = (req, res, next) => {
  if (req.body.wareHouseId != undefined) {
    user
      .findAll({
        where: {
          roleId: 6,
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          {
            model: package_user,
            where: {
              codDone: true,
              idAccountantConfirm: null,
            },
          },
        ],
      })
      .then((responsive) => {
        res.send(responsive);
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  } else {
    user
      .findAll({
        where: {
          roleId: 6,
        },
        include: [
          {
            model: package_user,
            where: {
              codDone: true,
              idAccountantConfirm: null,
            },
          },
        ],
      })
      .then((responsive) => {
        responsive.map((element) => {
          return (element.password = "******");
        });

        res.send({
          success: true,
          data: responsive,
        });
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  }
};

module.exports.getPkgHistoryByShipper = async (req, res, next) => {
  if (req.body.idUserShipper != undefined) {
    var userAlready = await user.findOne({
      where: {
        id: req.body.idUserShipper,
      },
    });

    if (userAlready != undefined) {
      if (userAlready.roleId != 6)
        return res.send({ success: false, mess: "User not Shipper" });

      var _datas = await package_user.findAll({
        where: {
          userId: req.body.idUserShipper,
        },
        include: [
          {
            model: packages,
            include: [warehouse_package],
          },
        ],
      });

      if (req.query.search != undefined) {
        _datas = _.filter(_datas, (o) => {
          if (o.package.cartonNo != undefined)
            if (
              new String(
                o.package.cartonNo
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
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

      return res.send({ success: true, data: _datas });
    } else {
      return res.send({ success: false, mess: "User Not Found !" });
    }
  } else {
    return res.send({ success: false, mess: "Missing idUserShipper !" });
  }
};

module.exports.getShippingMethod = async (req, res, next) => {
  var shipping_method = await logisticDB.shipping_method.findAll({});

  return res.send({ success: true, data: shipping_method });
};

module.exports.getShipperCodConfirmByWhId = (req, res, next) => {
  if (req.body.wareHouseId != undefined) {
    user
      .findAll({
        where: {
          roleId: 6,
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          {
            model: package_user,
            include: [
              {
                model: packages,
                include: [fee, warehouse_package],
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        responsive = JSON.parse(JSON.stringify(responsive));
        for (var i = 0; i < responsive.length; i++) {
          responsive[i].package_users = _.filter(
            responsive[i].package_users,
            (o) => {
              if (o.idAccountantConfirm == null && o.codDone == 1) return o;
            }
          );
        }

        responsive.map((element) => {
          return (element.password = "******");
        });

        new Promise(async (resolve, reject) => {
          for (var i = 0; i < responsive.length; i++) {
            var sumCod = 0;

            if (responsive[i].package_users != null) {
              sumCod += _.sumBy(responsive[i].package_users, (b) => {
                return b.package.fee.cod;
              });
            }

            responsive[i].sumCod = sumCod;
          }
          resolve(responsive);
        }).then((result) => {
          res.send(result);
        });
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  } else {
    user
      .findAll({
        where: {
          roleId: 6,
        },
        include: [
          {
            model: package_user,
            where: {
              codDone: true,
              idAccountantConfirm: null,
            },
            include: [
              {
                model: packages,
                include: [fee],
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        for (var i = 0; i < responsive.length; i++) {
          responsive[i].package_users = _.filter(
            responsive[i].package_users,
            (o) => {
              if (o.idAccountantConfirm == null && o.codDone == 1) return o;
            }
          );
        }

        responsive.map((element) => {
          return (element.password = "******");
        });

        responsive = JSON.parse(JSON.stringify(responsive));
        new Promise(async (resolve, reject) => {
          for (var i = 0; i < responsive.length; i++) {
            var sumCod = 0;
            if (responsive[i].package_users != null) {
              sumCod += _.sumBy(responsive[i].package_users, (b) => {
                return b.package.fee.cod;
              });
            }

            responsive[i].sumCod = sumCod;
          }

          resolve(responsive);
        }).then((result) => {
          res.send(result);
        });
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  }
};

module.exports.getSumCodNeedConfirm = (req, res, next) => {
  if (req.body.id_shipper != undefined) {
    package_user
      .findAll({
        where: {
          codDone: 1,
          idAccountantConfirm: null,
          userId: req.body.id_shipper,
        },
        include: [
          {
            model: packages,
            include: [fee],
          },
        ],
      })
      .then((responsive) => {
        var sum = _.sumBy(responsive, (o) => {
          if (o.package.fee != null) return o.package.fee.cod;
        });

        if (sum == undefined) sum = 0;

        res.send({ success: true, codSum: sum });
      });
  } else {
    return res.send({ success: false, mess: "Missing parram id_shipper" });
  }
};
