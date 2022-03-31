const moment = require("moment");
const { Sequelize, logisticDB } = require("../models");
const shipment = logisticDB.shipment;
const companies = logisticDB.companies;
const packages = logisticDB.packages;
const package_user = logisticDB.package_user;
const warehouse_package = logisticDB.warehouse_package;
const fee = logisticDB.fee;
const Op = Sequelize.Op;
const utils = require("../common/utils");
const _ = require("lodash");
var axios = require("axios");
var { APP_URL, TRANSLATE_API_ENDPOINT } = require("../configs");
APP_URL = process.env.APP_URL ? process.env.APP_URL : APP_URL;

module.exports.createShipment = (req, res, next) => {
  let body = req.body;
  body.userId = req.user.idUser;

  shipment
    .create({
      ...body,
    })
    .then((response) => res.json(response))
    .catch((e) => {
      res.json({
        status: false,
        message: e.message,
      });
    });
};

module.exports.getShipmentById = async (req, res, next) => {
  let body = req.body;
  var countPackage = await shipment.count({
    where: { id: body.id },
  });
  if (countPackage == 1) {
    shipment
      .findOne({
        where: { id: body.id },
      })
      .then((responsive) => {
        res.send(responsive);
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  } else {
    next(new Error("404:Not Found ShipmentID"));
  }
};

module.exports.getShipmentByCompanyId = async (req, res, next) => {
  let body = req.body;

  if (body.companyId == undefined)
    return res
      .status(400)
      .json({ success: false, mess: "Missing parram companyId" });

  var company = await companies.findOne({
    where: {
      id: body.companyId,
    },
  });

  if (company) {
    if (body.state != undefined) {
      var responsive = await shipment.findAll({
        where: {
          id_company: body.companyId,
          state: body.state,
        },
      });

      if (req.body.startDate != undefined && req.body.endDate != undefined) {
        responsive = _.filter(responsive, (o) => {
          if (
            new Date(o.createdAt).getTime() <=
              new Date(req.body.endDate).getTime() &&
            new Date(o.createdAt).getTime() >=
              new Date(req.body.startDate).getTime()
          )
            return o;
        });
      }

      responsive = _.sortBy(responsive, function (dateObj) {
        return new Date(dateObj.createdAt);
      });

      responsive = _.reverse(responsive);

      return res.status(200).json({ success: true, listShipment: responsive });
    } else {
      var responsive = await shipment.findAll({
        where: {
          id_company: body.companyId,
        },
      });

      if (req.body.startDate != undefined && req.body.endDate != undefined) {
        responsive = _.filter(responsive, (o) => {
          if (
            new Date(o.createdAt).getTime() <=
              new Date(req.body.endDate).getTime() &&
            new Date(o.createdAt).getTime() >=
              new Date(req.body.startDate).getTime()
          )
            return o;
        });
      }

      responsive = _.sortBy(responsive, function (dateObj) {
        return new Date(dateObj.createdAt);
      });

      responsive = _.reverse(responsive);

      return res.status(200).json({ success: true, listShipment: responsive });
    }
  } else {
    next(new Error("404:Not Found CompanyID"));
  }
};

module.exports.getSumDebitShipment = async (req, res, next) => {
  let body = req.body;

  if (body.id_company != undefined) {
    shipment
      .findAll({
        where: {
          id_company: body.id_company,
        },
      })
      .then((responsive) => {
        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        if (req.body.wareHouseId != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (o.wareHouseId == req.body.wareHouseId) return o;
          });
        }

        responsive = _.reverse(responsive);

        new Promise(async (resolve, reject) => {
          var lstShipment = [];
          for (var i = 0; i < responsive.length; i++) {
            var element = JSON.parse(JSON.stringify(responsive[i]));

            var listPackages = await packages.findAll({
              where: {
                shipmentId: element.id,
              },
              include: [package_user, fee, warehouse_package],
            });

            var SumCodHadRefund = _.sumBy(listPackages, (o) => {
              if (o.warehouse_package != null) {
                if (
                  o.warehouse_package.statusId != 5 &&
                  o.warehouse_package.statusId != 7 &&
                  o.warehouse_package.statusId != 8
                ) {
                  element.statusProgressing = "progressing";
                } else {
                  element.statusProgressing = "done";
                }
              }

              if (o.fee != null) {
                if (o.fee.isRefundDone == 1) {
                  return o.fee.cod;
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            });

            var SumCodNeedRefund = _.sumBy(listPackages, (o) => {
              if (o.warehouse_package.statusId == 5)
                if (o.fee != null) return o.fee.cod;
            });

            element.SumCodHadRefund = SumCodHadRefund;
            element.SumNeedRefund = SumCodNeedRefund;

            if (element.SumCodHadRefund == undefined)
              element.SumCodHadRefund = 0;

            if (element.SumNeedRefund == undefined) element.SumNeedRefund = 0;

            if (element.fee != null) {
              var SumCostNeedPaid = _.sumBy(listPackages, (o) => {
                if (o.warehouse_package.statusId == 5)
                  if (o.fee != null) return o.fee.cost;
              });

              var SumCostHadPaid = _.sumBy(listPackages, (o) => {
                if (o.warehouse_package.statusId == 5)
                  if (o.fee != null && !o.fee.isRefundDone) return o.fee;
              });

              element.SumCostHadPaid = SumCostHadPaid;
              element.SumCostNeedPaid = SumCostNeedPaid;
            } else {
              element.SumCostHadPaid = 0;
              element.SumCostNeedPaid = 0;
            }

            if (element.SumCostHadPaid == undefined) element.SumCostHadPaid = 0;
            if (element.SumCostNeedPaid == undefined)
              element.SumCostNeedPaid = 0;

            lstShipment.push(element);
          }

          resolve(lstShipment);
        }).then((result) => {
          if (req.query.status != undefined) {
            result = _.filter(result, (o) => {
              if (o.statusProgressing == req.query.status) return o;
            });

            res.send(result);
          } else {
            res.send(result);
          }
        });
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  } else {
    shipment
      .findAll({})
      .then((responsive) => {
        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        if (req.body.wareHouseId != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (o.wareHouseId == req.body.wareHouseId) return o;
          });
        }
        

        responsive = _.reverse(responsive);

        new Promise(async (resolve, reject) => {
          var lstShipment = [];
          for (var i = 0; i < responsive.length; i++) {
            var element = JSON.parse(JSON.stringify(responsive[i]));

            var listPackages = await packages.findAll({
              where: {
                shipmentId: element.id,
              },
              include: [package_user, fee, warehouse_package],
            });

            element.statusProgressing = "done";

            var SumCodHadRefund = _.sumBy(listPackages, (o) => {
              if (o.warehouse_package != null) {
                if (
                  o.warehouse_package.statusId != 5 &&
                  o.warehouse_package.statusId != 7 &&
                  o.warehouse_package.statusId != 8
                )
                  element.statusProgressing = "progressing";
              } else {
                element.statusProgressing = "progressing";
              }

              if (o.fee != null) {
                if (o.fee.isRefundDone == 1) {
                  return o.fee.cod;
                } else {
                  return 0;
                }
              } else {
                return 0;
              }
            });

            var SumCodNeedRefund = _.sumBy(listPackages, (o) => {
              if (o.warehouse_package.statusId == 5)
                if (o.fee != null) return o.fee.cod;
            });

            element.SumCodHadRefund = SumCodHadRefund;
            element.SumCodNeedRefund = SumCodNeedRefund;

            if (element.SumCodHadRefund == undefined)
              element.SumCodHadRefund = 0;

            if (element.SumCodNeedRefund == undefined)
              element.SumCodNeedRefund = 0;

            var SumCostNeedPaid = _.sumBy(listPackages, (o) => {
              if (o.warehouse_package.statusId == 5)
                if (o.fee != null) return o.fee.cost;
            });

            var SumCostHadPaid = _.sumBy(listPackages, (o) => {
              if (o.warehouse_package.statusId == 5)
                if (o.fee != null && o.fee.isPaidDone) return o.fee.cost;
            });

            element.SumCostHadPaid = SumCostHadPaid;
            element.SumCostNeedPaid = SumCostNeedPaid;

            if (element.SumCostHadPaid == undefined) element.SumCostHadPaid = 0;

            if (element.SumCostNeedPaid == undefined)
              element.SumCostNeedPaid = 0;

            lstShipment.push(element);
          }

          resolve(lstShipment);
        }).then((result) => {
          if (req.query.status != undefined) {
            result = _.filter(result, (o) => {
              if (o.statusProgressing == req.query.status) return o;
            });

            res.send(result);
          } else {
            res.send(result);
          }
        });
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  }
};

module.exports.getShipmentHavePkgShipped = async (req, res, next) => {
  if (req.body.id_company != undefined) {
    var responsive = await shipment.findAll({
      where: {
        id_company: req.body.id_company,
      },
      include: [
        {
          model: packages,
          include: [warehouse_package],
        },
      ],
    });

    if (req.body.startDate != undefined && req.body.endDate != undefined) {
      responsive = _.filter(responsive, (o) => {
        if (
          new Date(o.createdAt).getTime() <=
            new Date(req.body.endDate).getTime() &&
          new Date(o.createdAt).getTime() >=
            new Date(req.body.startDate).getTime()
        )
          return o;
      });
    }

    responsive = _.sortBy(responsive, function (dateObj) {
      return new Date(dateObj.createdAt);
    });

    responsive = _.reverse(responsive);

    res.send({ success: true, data: responsive });
  } else {
  }
};

module.exports.getShipmentByStatusText = async (req, res, next) => {
  let body = req.body;
  body.userId = req.user.idUser;
  if (req.user.role == "admin" || req.user.role == "subAdmin") {
    shipment
      .findAll({
        where: { state: body.statusText },
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        responsive = _.reverse(responsive);

        res.send(responsive);
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  } else {
    shipment
      .findAll({
        where: { state: body.statusText, userId: body.userId },
      })
      .then((responsive) => {
        responsive = JSON.parse(JSON.stringify(responsive));

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

module.exports.getShipmentByIdWarehouse = async (req, res, next) => {
  let body = req.body;

  if (body.state == undefined) {
    shipment
      .findAll({
        where: { wareHouseId: body.wareHouseId },
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        responsive = _.reverse(responsive);

        res.send(responsive);
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  } else {
    shipment
      .findAll({
        where: { wareHouseId: body.wareHouseId, state: body.state },
      })
      .then((responsive) => {
        if (body.at_warehouse != undefined) {
          responsive = _.filter(responsive, function (o) {
            if (o.at_warehouse == body.at_warehouse) {
              return o;
            }
          });
        }

        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        responsive = _.reverse(responsive);

        res.send(responsive);
      })
      .catch((e) => {
        next(new Error(`404:${e}`));
      });
  }
};

module.exports.updateShipment = async (req, res, next) => {
  const body = req.body;
  const idShipment = req.params.idShipment;
  console.log(idShipment);

  if ("invoiceNo" in body) {
    throw new Error("400:Can't update invoiceNo");
  }
  const countShipment = await shipment.count({
    where: {
      id: idShipment,
    },
  });

  if (countShipment === 1) {
    if (body.wareHouseId != undefined || body.wbId != undefined) {
    }

    if (body.state == "at_warehouse") {
      body.at_warehouse = 1;
      delete body.state;
    }

    shipment
      .update(body, {
        where: { id: idShipment },
      })
      .then((response) => {
        res.json({ message: "Update PKL Successful" });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } else {
    next(new Error("400:Can't update this PKL"));
  }
};

module.exports.getAllShipment = async (req, res, next) => {
  let body = req.body;
  body.userId = req.user.idUser;

  if (req.user.role == "admin" || req.user.role == "subAdmin") {
    shipment.findAll({}).then((responsive) => {
      responsive = _.sortBy(responsive, function (dateObj) {
        return new Date(dateObj.createdAt);
      });

      new Promise((resolve, reject) => {
        var listShipment = JSON.parse(JSON.stringify(responsive));
        var result = [];

        for (var i = 0; i < listShipment.length; i++) {
          console.log(listShipment[i].userId);
          console.log(body.userId);

          if (listShipment[i].userId !== body.userId) {
            if (listShipment[i].state !== "creating") {
              result.push(listShipment[i]);
            }
          } else {
            result.push(listShipment[i]);
          }
        }

        resolve(result);
      })
        .then((responsive) => {
          responsive = _.sortBy(responsive, function (dateObj) {
            return new Date(dateObj.createdAt);
          });

          if (
            req.body.startDate != undefined &&
            req.body.endDate != undefined
          ) {
            responsive = _.filter(responsive, (o) => {
              if (
                new Date(o.createdAt).getTime() <=
                  new Date(req.body.endDate).getTime() &&
                new Date(o.createdAt).getTime() >=
                  new Date(req.body.startDate).getTime()
              )
                return o;
            });
          }
          responsive = _.reverse(responsive);

          res.send(responsive);
        })
        .catch((e) => {
          res.json({
            status: false,
            message: e.message,
          });
        });
    });
  } else if (req.user.role == "warehouse_manager") {
    shipment
      .findAll({
        where: { wareHouseId: req.user.warehouse_id, state: "closed" },
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        responsive = _.reverse(responsive);
        res.send(responsive);
      })
      .catch((e) => {
        res.json({
          status: false,
          message: e.message,
        });
      });
  } else {
    shipment
      .findAll({
        where: { id_company: req.user.companyId },
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        if (req.user.role == "warehouse_manager") {
          responsive = _.filter(responsive, (o) => {
            if (o.warehouse_id != undefined) {
              if (o.warehouse_id == req.user.warehouse_id) {
                return o;
              }
            }
          });
        }

        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        responsive = _.reverse(responsive);
        res.send(responsive);
      })
      .catch((e) => {
        res.json({
          status: false,
          message: e.message,
        });
      });
  }
};

module.exports.getAllShipmentByCompanyId = async (req, res, next) => {
  let body = req.body;
  body.userId = req.user.idUser;
  if (req.user.role == "admin" || req.user.role == "subAdmin") {
    shipment
      .findAll({
        where: {},
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        responsive = _.reverse(responsive);
        res.send(responsive);
      })
      .catch((e) => {
        res.json({
          status: false,
          message: e.message,
        });
      });
  } else {
    shipment
      .findAll({
        where: { userId: body.userId },
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        if (req.body.startDate != undefined && req.body.endDate != undefined) {
          responsive = _.filter(responsive, (o) => {
            if (
              new Date(o.createdAt).getTime() <=
                new Date(req.body.endDate).getTime() &&
              new Date(o.createdAt).getTime() >=
                new Date(req.body.startDate).getTime()
            )
              return o;
          });
        }
        responsive = _.reverse(responsive);
        res.send(responsive);
      })
      .catch((e) => {
        res.json({
          status: false,
          message: e.message,
        });
      });
  }
};

module.exports.getListPklByUserId = (userId) => {
  return secondaryDB.shippingPackageLists.findAll({
    where: {
      userId,
    },
  });
};

module.exports.closeShipment = async (req, res, body, next) => {
  const idShipment = req.params.idShipment;
  const shipment = await SecondaryShipmentModel.findOne({
    where: {
      id: idShipment,
    },
  });
  try {
    const listPackageOfPkl = await secondaryDB.shipment.findAll({
      where: {
        pklId: idShipment,
      },
    });
    if (!listPackageOfPkl.length > 0) {
      throw new Error(`400:Pkl must have at least one package!`);
    }
    const message = listPackageOfPkl
      .map((value, index) =>
        ["gross", "width", "length", "height"]
          .map((key) => {
            if (!value[key] || value[key] === 0) {
              return `${key} field in lake with "PKG No" ${value.cartonNo} is wrong value!`;
            }
            return null;
          })
          .filter((text) => text)
          .join()
      )
      .filter((text) => text);
    if (message.length > 0) {
      throw new Error(`400:${message.join()}`);
    }
    await Promise.all([
      SecondaryShipmentModel.update(
        {
          ...body,
          state: "preparing",
        },
        {
          where: { id: idShipment },
        }
      ),
      secondaryDB.shipment.update(
        {
          state: "closed",
        },
        {
          where: {
            pklId: idShipment,
          },
        }
      ),
    ]);
    let params = {
      idinv: idShipment,
      type: ["admin", "subAdmin"].includes(req.user.role) ? 2 : 1,
    };
    try {
      var transport = nodemailer.createTransport(mailerConfig);
      transport.sendMail(
        {
          from: '"Safecargo" <jsf@gmail.com>',
          to: mailVN.mail.join(","),
          subject: "INV " + shipment.invoiceNo + " has been submitted",
          html: `<p style="font-size: 20px">INV <a href="${
            mailVN.url
          }/invoices/${shipment.id}">${
            shipment.invoiceNo
          }</a> has been submitted by client <b>${
            req.user.username
          }</b> at <b>${utils.timestamp()}</b>.<br>Please check!</p>`,
        },
        (error, info) => {
          if (error) {
          }
        }
      );
    } catch (error) {}

    const apires = await axios.get(TRANSLATE_API_ENDPOINT, {
      params: params,
    });

    res.json("Close Shipment Successful");
  } catch (error) {
    throw new Error("400:" + error.message);
  }
};

module.exports.closeInvoice = async (req, res, next) => {
  const idShipment = req.params.idShipment;
  const shipment = await SecondaryShipmentModel.findOne({
    where: {
      id: idShipment,
    },
  });
  try {
    SecondaryShipmentModel.update(
      {
        state: "preparing",
        csProcessedName: req.user.username,
        processedDate: new Date(),
      },
      {
        where: { id: idShipment },
      }
    );
    let params = {
      idinv: idShipment,
      type: ["admin", "subAdmin"].includes(req.user.role) ? 2 : 1,
    };
    try {
      var transport = nodemailer.createTransport(mailerConfig);
      transport.sendMail(
        {
          from: '"Safecargo" <jsfapp@gmail.com>',
          to: mailJP.mail.join(","),
          subject: "INV " + shipment.invoiceNo + " has been checked",
          html: `<p style="font-size: 20px">INV <a href="${
            mailJP.url
          }/invoices/${shipment.id}">${
            shipment.invoiceNo
          }</a> has been checked and confirmed by <b>${
            req.user.username
          }</b> at <b>${utils.timestamp()}</b>.<br>Please check!</p>`,
        },
        (error, info) => {
          if (error) {
          }
        }
      );
      transport.sendMail(
        {
          from: '"Safecargo" <jsfapp@gmail.com>',
          to: mailVN.mail.join(","),
          subject: "INV " + shipment.invoiceNo + " has been checked",
          html: `<p style="font-size: 20px">INV <a href="${
            mailVN.url
          }/invoices/${shipment.id}">${
            shipment.invoiceNo
          }</a> has been checked and confirmed by <b>${
            req.user.username
          }</b> at <b>${utils.timestamp()}</b>.<br>Please check!</p>`,
        },
        (error, info) => {
          if (error) {
          }
        }
      );
    } catch (error) {}

    const apires = await axios.get(TRANSLATE_API_ENDPOINT, {
      params: params,
    });
    res.json("Close Invoice Successful");
  } catch (error) {
    next(error);
  }
};

module.exports.generateInvoiceNo = async (req, res, next) => {
  const { prefixInvoiceNo } = req.query;
  var users = await primaryDB.users.findAll({
    where: {
      companyId: req.user.companyId,
    },
    attributes: ["id"],
  });
  if (users.length > 0) {
    users = users.map((u) => u["id"]);
  } else {
    users = [];
  }
  let result = await SecondaryShipmentModel.findOne({
    where: {
      userId: {
        [Op.in]: users,
      },
      invoiceNo: {
        [Op.startsWith]: prefixInvoiceNo,
      },
    },
    order: [["createdAt", "DESC"]],
  });
  if (result) {
    res.json(result.invoiceNo);
  } else res.json(null);
};

module.exports.getLastCodeShipment = async (req, res, next) => {
  let { customerId } = req.user;
  let result = await SecondaryShipmentModel.findAndCountAll();
  let count = result.count;
  let dateString = moment().format("YYYYMMDD");
  let invoiceNo = `${customerId}${dateString}-${count}`;
  res.json(invoiceNo);
};

module.exports.getLastInvoiceShipment = async (req, res, next) => {
  var Mycompany = await companies.findOne({
    where: {
      id: req.user.companyId,
    },
  });

  shipment.findAll({ companyId: req.user.companyId }).then((result) => {
    if (result.length == 0) invoiceNew = "SAFE000-00";

    var invoiceNew = new String(result[result.length - 1].invoiceNo).slice(
      Mycompany.companyCode.length,
      result[result.length - 1].invoiceNo.length
    );

    var invoiceNewResult = Number.parseInt(
      new String(invoiceNew).split("-")[1]
    );

    invoiceNewResult += 1;

    // if (invoiceNewResult <= 9) {
    //   invoiceNewResult = "00" + invoiceNewResult;
    // } else if (invoiceNewResult >= 10 && invoiceNewResult < 100) {
    //   invoiceNewResult = "0" + invoiceNewResult;
    // } else if (invoiceNewResult >= 100 && invoiceNewResult <= 999) {
    // } else {
    //   invoiceNewResult = new String(invoiceNewResult).slice(0, 3);
    // }

    var firstNumber = new String(invoiceNew).split("-")[0];
    if (firstNumber.length == 1) {
      firstNumber = "00" + firstNumber;
    } else if (firstNumber.length == 2) {
      firstNumber = "0" + firstNumber;
    }

    return res.status(200).json({
      success: true,
      invoiceNew: firstNumber + "-" + invoiceNewResult,
    });
  });
};

const getAllItemById = async (itemsGroupBySourceType) => {
  const [pdbItems, [sdbItems, sdbImages], [candidateItems, candidateImages]] =
    await Promise.all([
      primaryDB.products.findAll({
        where: {
          id: itemsGroupBySourceType.pdb_item.map((item) => item.sourceId),
        },
        include: [
          {
            model: primaryDB.productImages,
          },
          {
            model: primaryDB.productLinks,
          },
        ],
      }),
      Promise.all([
        secondaryDB.products.findAll({
          where: {
            id: itemsGroupBySourceType.sdb_item.map((item) => item.sourceId),
          },
        }),
        secondaryDB.productImages.findAll({
          where: {
            productId: itemsGroupBySourceType.sdb_item.map(
              (item) => item.sourceId
            ),
            productType: "sdb_item",
          },
        }),
      ]),
      Promise.all([
        secondaryDB.productCandidates.findAll({
          where: {
            id: itemsGroupBySourceType.sdb_candidate.map(
              (item) => item.sourceId
            ),
          },
        }),
        secondaryDB.productImages.findAll({
          where: {
            productId: itemsGroupBySourceType.sdb_candidate.map(
              (item) => item.sourceId
            ),
            productType: "sdb_candidate",
          },
        }),
      ]),
    ]);

  const objectSdbImages = _.groupBy(sdbImages, "productId");
  const objectCandidateImages = _.groupBy(sdbImages, "productId");

  return [
    ...pdbItems,
    ...sdbItems.map((item) => {
      if (objectSdbImages[item.id]) {
        item.dataValues.images = objectSdbImages[item.id].map(
          (image) => image.uri
        );
      }
      return item;
    }),
    ...candidateItems.map((item) => {
      if (objectCandidateImages[item.id]) {
        item.dataValues.images = objectCandidateImages[item.id].map(
          (image) => image.uri
        );
      }
      return item;
    }),
  ];
};

const groupItemsByJanCode = (shipment) => {
  const levelType = {
    sdb_candidate: 1,
    sdb_item: 10,
    pdb_item: 100,
  };
  const items = {};
  shipment.map((package) => {
    package.shippingItems.filter((item) => {
      if (!items[item.janCode]) {
        items[item.janCode] = item;
      } else if (levelType[items[item.janCode].type] < levelType[item.type]) {
        items[item.janCode] = item;
      }
      return item;
    });
  });
  return items;
};

const checkProductDuplicateByJanCode = async (janCode) => {
  const [countPdb, countSdb, countCandidate] = await Promise.all([
    primaryDB.products.count({
      where: {
        janCode,
      },
    }),
    secondaryDB.products.count({
      where: {
        janCode,
      },
    }),
    secondaryDB.productCandidates.count({
      where: {
        janCode,
      },
    }),
  ]);

  const numberProduct = countPdb + countSdb + countCandidate;

  if (numberProduct === 0) {
    return { janCode, isDuplicate: false };
  }

  if (numberProduct === 1) {
    if (countCandidate || countSdb) {
      return { janCode, isDuplicate: true };
    }
    return { janCode, isDuplicate: false };
  }
  return { janCode, isDuplicate: true };
};

module.exports.getShipmentByInvoiceNo = async ({ id }, actor) => {
  const _shipment = await secondaryDB.shippingPackageLists.findOne({
    where: {
      id,
    },
    include: [
      {
        model: secondaryDB.shipment,
        attributes: [
          "id",
          "state",
          "cartonNo",
          "net",
          "gross",
          "height",
          "width",
          "length",
        ],
        include: [
          {
            model: secondaryDB.shippingItems,
            as: "shippingItemV1s",
            where: {},
          },
        ],
      },
    ],
  });

  const shipment = JSON.parse(JSON.stringify(_shipment));
  shipment.shippingItems = shipment.shippingItemV1s;

  const itemsGroupByJanCode = groupItemsByJanCode(shipment.shipment);

  const itemsGroupBySourceType = _.groupBy(
    Object.values(itemsGroupByJanCode),
    "sourceType"
  );
  if (!itemsGroupBySourceType.pdb_item) {
    itemsGroupBySourceType.pdb_item = [];
  }
  if (!itemsGroupBySourceType.sdb_item) {
    itemsGroupBySourceType.sdb_item = [];
  }
  if (!itemsGroupBySourceType.sdb_candidate) {
    itemsGroupBySourceType.sdb_candidate = [];
  }
  const [products, checkProductDuplicates] = await Promise.all([
    getAllItemById(itemsGroupBySourceType),
    Promise.all(
      Object.keys(itemsGroupByJanCode).map((janCode) => {
        return checkProductDuplicateByJanCode(janCode);
      })
    ),
  ]);

  const itemsDuplicate = _.keyBy(checkProductDuplicates, "janCode");
  const hightlightProducts = products.map((product) => {
    const _product = JSON.parse(JSON.stringify(product));
    if (itemsDuplicate[_product.janCode]) {
      _product.hightlight = itemsDuplicate[_product.janCode].isDuplicate;
    }
    return _product;
  });
  return {
    ...shipment,
    products: hightlightProducts,
  };
};

module.exports.removeItemBySource = async (pklId, sourceType, sourceId) => {
  const pklItem = await secondaryDB.shippingPklsItems.findOne({
    where: {
      pklId,
      sourceId,
      sourceType,
    },
  });
  if (!pklItem) {
    throw new Error("404:Not Found");
  }
  await Promise.all([
    pklItem.destroy(),
    secondaryDB.shippingItemsV2.destroy({
      where: {
        pklItemId: pklItem.id,
      },
    }),
  ]);

  return {
    message: "Success",
  };
};
