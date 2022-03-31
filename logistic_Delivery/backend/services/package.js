const { logisticDB, Sequelize } = require("../models");
const _ = require("lodash");
const users = logisticDB.user;
const packages = logisticDB.packages;
const warehouse_package = logisticDB.warehouse_package;
const package_status = logisticDB.package_status;
const package_user = logisticDB.package_user;
const package_source_link = logisticDB.pkg_source_link;
const pkg_receiver = logisticDB.pkg_receiver;
const pkg_effort = logisticDB.pkg_effort;
const fee = logisticDB.fee;
const customer_receiver = logisticDB.customer_receiver;
const bags = logisticDB.bags;
const shipments = logisticDB.shipment;
const tracking_package = logisticDB.tracking_package;

const Op = Sequelize.Op;

module.exports.getPackageByShipmentId = async (req, res, next) => {
  let body = req.body;

  packages
    .findAll({
      where: {
        shipmentId: body.shipmentId,
      },
      include: [
        tracking_package,
        bags,
        shipments,
        fee,
        {
          model: pkg_receiver,
          include: [
            {
              model: customer_receiver,
            },
          ],
        },
        {
          model: warehouse_package,
        },
        {
          model: package_user,
        },
      ],
    })
    .then((responsive) => {
      new Promise(async (resolve, reject) => {
        var _result = [];
        for (var i = 0; i < responsive.length; i++) {
          var element = JSON.parse(JSON.stringify(responsive[i]));

          if (element.package_user != null) {
            if (element.package_user.idAccountantConfirm != null) {
              var accountant = await users.findOne({
                where: {
                  id: element.package_user.idAccountantConfirm,
                },
              });
              element.package_user.accountant = accountant;
            }
          }

          if (element.fee != null) {
            if (element.fee.idAccountantPaid != null) {
              var accountantPaid = await users.findOne({
                where: {
                  id: element.fee.idAccountantPaid,
                },
              });
              element.fee.accountantPaid = accountantPaid;
            }
          }

          if (element.fee != null) {
            if (element.fee.idAccountantRefund != null) {
              var accountantRefund = await users.findOne({
                where: {
                  id: element.fee.idAccountantRefund,
                },
              });
              element.fee.accountantRefund = accountantRefund;
            }
          }

          if (req.body.status_id != undefined) {
            if (responsive[i].warehouse_package != null) {
              if (
                responsive[i].warehouse_package.statusId != undefined &&
                responsive[i].warehouse_package.statusId == req.body.status_id
              ) {
                _result.push(element);
              }
            }
          } else {
            _result.push(element);
          }
        }

        resolve(_result);
      }).then((_result) => {
        res.json(_result);
      });
    })
    .catch((e) => {
      next(new Error(`404:${e}`));
    });
};

module.exports.getPackageByStatus = (req, res, next) => {
  let body = req.body;
  body.userId = req.user.idUser;
  packages
    .findAll({
      include: [
        {
          model: warehouse_package,
          include: [
            {
              model: package_status,
              where: {
                statusText: req.params.statusText,
              },
            },
          ],
        },
        {
          model: pkg_receiver,
          include: [{ model: customer_receiver }],
        },
        {
          model: package_user,
        },
      ],
    })
    .then((response) => {
      response = _.sortBy(response, function (dateObj) {
        return new Date(dateObj.createdAt);
      });

      res.json(response);
    })
    .catch((e) => {
      res.json({
        status: false,
        message: e.message,
      });
    });
};

module.exports.createPackage = async (req, res, next) => {
  let body = req.body;
  body.userId = req.user.idUser;

  if (body.fee == undefined)
    return res.status(400).json({ success: false, mess: "Missing parram" });

  var _cartonNoAlready = await packages.findOne({
    where: {
      cartonNo: body.cartonNo,
      shipmentId: body.shipmentId,
    },
  });

  if (_cartonNoAlready != undefined) {
    return res
      .status(400)
      .json({ success: false, mess: "cartonNo already in Shipment" });
  } else {
    var _newfee = body.fee;
    _newfee.userId = body.userId;
    delete body.fee;
    packages
      .create({
        ...body,
      })
      .then(async (response) => {
        _newfee.packageId = response.id;

        var trackingpkg = await tracking_package.findOne({
          where: {
            package_id: _newfee.packageId,
            status_id: 1,
          },
        });

        if (trackingpkg != undefined) {
          await tracking_package.update(
            {
              package_id: _newfee.packageId,
              status_id: 1,
              createdAt: new Date(),
            },
            {
              where: {
                id: trackingpkg.id,
              },
            }
          );
        } else {
          await tracking_package.create({
            package_id: _newfee.packageId,
            status_id: 1,
          });
        }

        if (body.warehousepackage != undefined) {
          body.warehousepackage.packageId = response.id;
          console.log(body.warehousepackage);

          await warehouse_package.create({ ...body.warehousepackage });
        }

        fee.create({ ..._newfee }).then((feeResult) => {
          var result = JSON.parse(JSON.stringify(response));

          result.fee = JSON.parse(JSON.stringify(feeResult));

          res.json({ result });
        });
      })
      .catch((e) => {
        res.json({
          status: false,
          message: e.message,
        });
      });
  }
};

module.exports.updatePackage = async (req, res, next) => {
  let body = req.body;
  var data = JSON.parse(JSON.stringify(body));
  delete data.id;

  var dataNew = await packages.findOne({ pkgId: body.id });

  if (!dataNew)
    return res.status(400).json({ success: false, mess: "Missing parram !" });

  var countPackage = await packages.count({
    where: { id: body.id },
  });

  if (countPackage == 1) {
    //update with statusID
    if (body.warehousepackage != undefined) {
      var whp = await warehouse_package.findOne({
        where: {
          packageId: body.id,
        },
      });

      var trackingpkg = await tracking_package.findOne({
        where: {
          package_id: body.id,
          status_id: body.warehousepackage.statusId,
        },
      });

      if (trackingpkg != undefined) {
        await tracking_package.update(
          {
            package_id: body.id,
            status_id: body.warehousepackage.statusId,
            createdAt: new Date(),
          },
          {
            where: {
              id: trackingpkg.id,
            },
          }
        );
      } else {
        await tracking_package.create({
          package_id: body.id,
          status_id: body.warehousepackage.statusId,
        });
      }

      if (whp) {
        await warehouse_package
          .update(body.warehousepackage, {
            where: {
              packageId: body.id,
            },
          })
          .catch((e) => {
            throw next(new Error(`400:${e}`));
          });
      } else {
        if (body.warehousepackage.reasonId != undefined) {
          await warehouse_package
            .create({
              wareHouseId: body.warehousepackage.wareHouseId,
              packageId: body.id,
              statusId: body.warehousepackage.statusId,
              reasonId: body.warehousepackage.reasonId,
            })
            .catch((e) => {
              throw next(new Error(`400:${e}`));
            });
        } else {
          await warehouse_package
            .create({
              wareHouseId: body.warehousepackage.wareHouseId,
              packageId: body.id,
              statusId: body.warehousepackage.statusId,
            })
            .catch((e) => {
              throw next(new Error(`400:${e}`));
            });
        }
      }

      data.wareHouseId = body.warehousepackage.wareHouseId;
      delete data.warehousepackage;
    }

    //update with shiperID
    if (body.packageuser != undefined) {
      var pku = await package_user.findOne({
        where: {
          packageId: body.id,
        },
      });
      if (pku) {
        delete body.packageuser.packageId;

        if (body.packageuser.codDoneDatetime != undefined) {
          body.packageuser.codDoneDatetime = new Date();
        }

        await package_user
          .update(body.packageuser, {
            where: {
              packageId: body.id,
            },
          })
          .catch((e) => {
            throw next(new Error(`400:${e}`));
          });
      } else {
        await package_user.create(body.packageuser).catch((e) => {
          throw next(new Error(`400:${e}`));
        });
      }
    }

    //update receiver man
    if (body.pkgreceiver != undefined) {
      var pkgre = await pkg_receiver.findOne({
        where: {
          pkgId: body.id,
        },
      });

      if (pkgre) {
        delete body.pkgreceiver.pkgId;
        await pkg_receiver
          .update(body.pkgreceiver, {
            where: {
              pkgId: body.id,
            },
          })
          .catch((e) => {
            throw next(new Error(`400:${e}`));
          });
      } else {
        delete body.pkgreceiver.pkgId;
        await pkg_receiver
          .create({
            pkgId: body.id,
            ...body.pkgreceiver,
          })
          .catch((e) => {
            throw next(new Error(`400:${e}`));
          });
      }
    }

    if (body.fee != undefined) {
      await fee.update(body.fee, {
        where: {
          id: body.fee.id,
        },
      });
    }

    packages
      .update(data, {
        where: { id: body.id },
      })
      .then((response) => {
        res.json({
          status: true,
        });
      })
      .catch((e) => {
        next(new Error("404:Error Update"));
      });
  } else {
    next(new Error("404:Not Found PackageID"));
  }
};

module.exports.reWareHouse = async (req, res, next) => {
  let body = req.body;
  await package_user
    .destroy({
      where: {
        packageId: body.id,
      },
    })
    .catch((e) => {
      next(new Error(`400:${e}`));
    });
  await warehouse_package
    .update(
      {
        statusId: 1,
      },
      {
        where: {
          packageId: body.id,
        },
      }
    )
    .catch((e) => {
      next(new Error(`400:${e}`));
    });
  res.send({ status: true });
};

module.exports.addPackageError = async (req, res, next) => {
  let body = req.body;
  await warehouse_package
    .update(
      {
        statusId: 7,
        reasonId: body.reasonId,
      },
      {
        where: {
          packageId: body.id,
        },
      }
    )
    .catch((e) => {
      next(new Error(`400:${e}`));
    });
  res.send({ status: true });
};

module.exports.updateStatusPackage = async (req, res, next) => {
  let body = req.body;
  var countPackage = await packages.count({
    where: { id: body.id },
  });

  if (body.warehousepackage == undefined)
    return res.send({ success: false, mess: "Missing warehousepackage" });

  if (countPackage == 1) {
    await warehouse_package
      .update(
        {
          statusId: body.warehousepackage.statusId,
        },
        {
          where: {
            packageId: body.id,
          },
        }
      )
      .catch((e) => {
        next(new Error(`400:${e}`));
      });

    var trackingpkg = await tracking_package.findOne({
      where: {
        package_id: body.id,
        status_id: body.warehousepackage.statusId,
      },
    });

    if (body.packageuser != null) {
      var package_userAlready = await package_user.findOne({
        packageId: body.packageuser.packageId,
      });

      if (package_userAlready != undefined) {
        await package_user.update(
          { ...body.packageuser },
          {
            where: {
              packageId: body.packageuser.packageId,
            },
          }
        );
      } else {
        await package_user.create(body.packageuser);
      }
    }

    if (trackingpkg != undefined) {
      await tracking_package.update(
        {
          package_id: body.id,
          status_id: body.warehousepackage.statusId,
          createdAt: new Date(),
        },
        {
          where: {
            id: trackingpkg.id,
          },
        }
      );
    } else {
      await tracking_package.create({
        package_id: body.id,
        status_id: body.warehousepackage.statusId,
      });
    }

    res.send({ status: true });
  } else {
    next(new Error("404:Not Found PackageID"));
  }
};

module.exports.updatesrclinkPackage = async (req, res, next) => {
  let body = req.body;
  if (!body.id_package || !body.type || !body.link)
    return res.status(400).json({ success: false, mess: "Missing parram !" });

  var countPackage = await packages.count({
    where: { id: body.id_package },
  });

  if (countPackage == 1) {
    await package_source_link
      .create({
        type: body.type,
        link: body.link,
        packageId: body.id_package,
      })
      .catch((e) => {
        next(new Error(`400:${e}`));
      });
    res.send({ status: true });
  } else {
    next(new Error("404:Not Found PackageID"));
  }
};

module.exports.updateCodReceivedPackage = async (req, res, next) => {
  let body = req.body;

  if (!body.cod_received || !body.id_shipper || !body.id_package)
    return res.status(400).json({ success: false, mess: "Missing parram!" });

  var PackageUser = await package_user.findOne({
    where: { userId: body.id_shipper, packageId: body.id_package },
  });

  if (PackageUser) {
    await package_user
      .update(
        {
          codReceived: body.cod_received,
          codDone: true,
        },
        {
          where: {
            userId: body.id_shipper,
            packageId: body.id_package,
          },
        }
      )
      .catch((e) => {
        next(new Error(`400:${e}`));
      });
    res.send({ status: true });
  } else {
    next(new Error("404:Not Found Shipper"));
  }
};

module.exports.updateAccounteenConfirmPackage = async (req, res, next) => {
  let body = req.body;

  if (!body.id_accountant || !body.id_package)
    return res.status(400).json({ success: false, mess: "Missing parram!" });

  var PackageUser = await package_user.findOne({
    where: { packageId: body.id_package },
  });

  if (PackageUser) {
    var User = await users.findOne({
      where: { id: body.id_accountant },
    });

    if (User) {
      await package_user
        .update(
          {
            idAccountantConfirm: body.id_accountant,
            isActive: 1,
            codDoneDatetime: new Date(),
          },
          {
            where: {
              packageId: body.id_package,
            },
          }
        )
        .catch((e) => {
          next(new Error(`400:${e}`));
        });
      res.send({ status: true });
    } else {
      return res.status(400).json({ success: false, mess: "Not found User!" });
    }
  } else {
    next(new Error("404:Not Found Package"));
  }
};

module.exports.getPackageSuccess = async (req, res, next) => {
  await packages
    .findAll({
      include: [
        shipments,
        {
          model: package_user,
          where: {
            codDone: true,
          },
        },
      ],
    })
    .then((responsive) => {
      responsive = _.sortBy(responsive, function (dateObj) {
        return new Date(dateObj.createdAt);
      });
      res.send(responsive);
    })
    .catch((e) => {
      res.send({
        status: false,
        mess: e,
      });
    });
};

module.exports.getPackageErrorByWhId = async (req, res, next) => {
  let body = req.body;
  packages
    .findAll({
      include: [
        {
          model: warehouse_package,
          where: {
            id: body.wareHouseId,
          },
          include: [
            {
              model: package_status,
              where: {
                id: 5,
              },
            },
          ],
        },
      ],
    })
    .then((response) => {
      response = _.sortBy(response, function (dateObj) {
        return new Date(dateObj.createdAt);
      });
      res.json(response);
    })
    .catch((e) => {
      res.json({
        status: false,
        message: e.message,
      });
    });
};

module.exports.delPackageByPackageId = async (req, res, next) => {
  var countPackage = await packages.count({
    where: { id: req.body.id },
  });

  if (countPackage == 1) {
    await tracking_package.destroy({
      where: {
        package_id: req.body.id,
      },
    });

    await warehouse_package
      .destroy({
        where: {
          packageId: req.body.id,
        },
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
    await package_source_link
      .destroy({
        where: {
          packageId: req.body.id,
        },
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
    await package_user
      .destroy({
        where: {
          packageId: req.body.id,
        },
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
    await pkg_effort
      .destroy({
        where: {
          packageId: req.body.id,
        },
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
    await fee
      .destroy({
        where: {
          packageId: req.body.id,
        },
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
    await pkg_receiver
      .destroy({
        where: {
          pkgId: req.body.id,
        },
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
    await packages
      .destroy({
        where: {
          id: req.body.id,
        },
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
    res.send({ status: true });
  } else {
    throw next(new Error(`400:${`Not found package Id`}`));
  }
};

module.exports.getPackageByShipperId = async (req, res, next) => {
  if (req.body.userId == undefined) {
    return res
      .status(400)
      .json({ success: false, mess: "Missing parram userId!" });
  }

  await packages
    .findAll({
      include: [
        bags,
        shipments,
        fee,
        package_user,
        warehouse_package,
        {
          model: pkg_receiver,
          include: [
            {
              model: customer_receiver,
            },
          ],
        },
      ],
    })
    .then((responsive) => {
      responsive = _.sortBy(responsive, function (dateObj) {
        return new Date(dateObj.createdAt);
      });

      responsive = _.filter(responsive, function (o) {
        if (o.package_user != null) {
          if (o.package_user.userId == req.body.userId) return o;
        }
      });

      if (req.body.statusText != undefined) {
        responsive = _.filter(responsive, function (o) {
          if (req.body.statusText == "shipping")
            return o.warehouse_package.statusId == 4;
          if (req.body.statusText == "shipped")
            return o.warehouse_package.statusId == 5;
          if (req.body.statusText == "at_warehouse")
            return o.warehouse_package.statusId == 3;
          if (req.body.statusText == "shipping")
            return o.warehouse_package.statusId == 5;
          if (req.body.statusText == "not_shipped")
            return o.warehouse_package.statusId == 6;
          if (req.body.statusText == "inventory")
            return o.warehouse_package.statusId == 7;
          if (req.body.statusText == "out_inventory")
            return o.warehouse_package.statusId == 8;
        });
      }

      new Promise(async (resolve, reject) => {
        var _result = [];
        for (var i = 0; i < responsive.length; i++) {
          var element = JSON.parse(JSON.stringify(responsive[i]));

          if (element.package_user != null) {
            if (element.package_user.idAccountantConfirm != null) {
              var accountant = await users.findOne({
                where: {
                  id: element.package_user.idAccountantConfirm,
                },
              });
              element.package_user.accountant = accountant;
            }
          }

          if (req.body.status_id != undefined) {
            if (responsive[i].warehouse_package != null) {
              if (
                responsive[i].warehouse_package.statusId != undefined &&
                responsive[i].warehouse_package.statusId == req.body.status_id
              ) {
                _result.push(element);
              }
            }
          } else {
            if (responsive[i].warehouse_package != null) _result.push(element);
          }
        }


        if (req.query.search != undefined) {
          _result = _.filter(_result, (o) => {
            if (o.cartonNo != undefined)
              if (
                new String(
                  o.cartonNo
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
                  ||
                  new String(
                    o.shipment.invoiceNo
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

        resolve(_result);
      }).then((_result) => {
        res.json(_result);
      });
    })
    .catch((e) => {
      throw next(new Error(`400:${e}`));
    });
};

module.exports.getPackageDoneCodByShipperId = async (req, res, next) => {
  if (!req.body.id_shipper || !req.body.date)
    return res.status(400).json({ success: false, mess: "Missing parram !" });

  var shipper = await package_user.findOne({
    where: {
      userId: req.body.id_shipper,
    },
  });

  if (!shipper)
    return res
      .status(400)
      .json({ success: false, mess: "Not found id_shipper" });

  var result = await package_user.findAll({
    where: {
      userId: req.body.id_shipper,
      codDone: true,
    },
  });

  result = _.sortBy(result, function (dateObj) {
    return new Date(dateObj.createdAt);
  });

  return res.status(200).json({ success: true, data: result });
};

module.exports.getPackageDoneCodByWarehouseId = async (req, res, next) => {
  if (!req.body.id_warehouse)
    return res.status(400).json({ success: false, mess: "Missing parram !" });

  var shipper = await package_user.findOne({
    where: {
      userId: req.body.id_shipper,
    },
  });

  if (!shipper)
    return res
      .status(400)
      .json({ success: false, mess: "Not found id_shipper" });

  var result = await package_user.findAll({
    where: {
      userId: req.body.id_shipper,
      codDone: true,
    },
  });

  result = _.sortBy(result, function (dateObj) {
    return new Date(dateObj.createdAt);
  });

  return res.status(200).json({ success: true, data: result });
};

module.exports.getPackageByWarehouseId = async (req, res, next) => {
  if (req.body.wareHouseId != undefined) {
    await packages
      .findAll({
        where: {
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          shipments,
          fee,
          {
            model: warehouse_package,
          },
          {
            model: package_user,
            include: [users],
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {

        if(req.query.search != undefined)
        {
          responsive = _.filter(responsive,(o)=>{
            if (o.cartonNo != undefined)
            if (
              new String(
                o.cartonNo
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
                ||
                new String(
                  o.shipment.invoiceNo
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
          })
          

          
          
        }
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        new Promise(async (resolve, reject) => {
          var _result = [];
          for (var i = 0; i < responsive.length; i++) {
            var element = JSON.parse(JSON.stringify(responsive[i]));

            if (element.package_user != null) {
              if (element.package_user.idAccountantConfirm != null) {
                var accountant = await users.findOne({
                  where: {
                    id: element.package_user.idAccountantConfirm,
                  },
                });
                element.package_user.accountant = accountant;
              }
            }

            if (req.body.status_id != undefined) {
              if (responsive[i].warehouse_package != null) {
                if (
                  responsive[i].warehouse_package.statusId != undefined &&
                  responsive[i].warehouse_package.statusId == req.body.status_id
                ) {
                  _result.push(element);
                }
              }
            } else {
              if (responsive[i].warehouse_package != null)
                _result.push(element);
            }
          }

          resolve(_result);
        }).then((_result) => {
          res.json(_result);
        });
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  } else {
    await packages
      .findAll({
        include: [
          {
            model: warehouse_package,
          },
          {
            model: package_user,
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        if(req.query.search != undefined)
        {
          responsive = _.filter(responsive,(o)=>{
            if (o.cartonNo != undefined)
            if (
              new String(
                o.cartonNo
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
                ||
                new String(
                  o.shipment.invoiceNo
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
          })
          

          
          
        }
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        var _result = [];
        responsive.map((element) => {
          if (req.body.status_id != undefined) {
            if (element.warehouse_package != null) {
              if (
                element.warehouse_package.statusId != undefined &&
                element.warehouse_package.statusId == req.body.status_id
              ) {
                _result.push(element);
              }
            }
          } else {
            if (element.warehouse_package != null) _result.push(element);
          }
        });

        res.json(_result);
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  }
};

module.exports.getallpackagewarehousebystatus = async (req, res, next) => {
  await packages
    .findAll({
      where: {
        wareHouseId: req.body.wareHouseId,
      },
      include: [
        {
          model: warehouse_package,
        },
        {
          model: package_user,
        },
        {
          model: pkg_receiver,
          include: [
            {
              model: customer_receiver,
            },
          ],
        },
      ],
    })
    .then((responsive) => {
      responsive = _.sortBy(responsive, function (dateObj) {
        return new Date(dateObj.createdAt);
      });

      var _result = [];
      responsive.map((element) => {
        if (req.body.status_id != undefined) {
          if (element.warehouse_package != null) {
            if (
              element.warehouse_package.statusId != undefined &&
              element.warehouse_package.statusId == req.body.status_id
            ) {
              _result.push(element);
            }
          }
        } else {
          if (element.warehouse_package != null) _result.push(element);
        }
      });

      res.json(_result);
    })
    .catch((e) => {
      throw next(new Error(`400:${e}`));
    });
};

module.exports.getAllCustomerPreparingByWarehouseId = async (
  req,
  res,
  next
) => {
  if (req.body.wareHouseId != undefined) {
    await packages
      .findAll({
        where: {
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          shipments,
          {
            model: warehouse_package,
          },
          {
            model: package_user,
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        new Promise(async (resolve, reject) => {
          var _result = [];
          for (var i = 0; i < responsive.length; i++) {
            var element = JSON.parse(JSON.stringify(responsive[i]));

            _result.push(element.pkg_receiver.customer_receiver);
          }

          resolve(_result);
        }).then((_result) => {
          res.json(_result);
        });
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  } else {
    return res
      .status(400)
      .json({ success: false, mess: "Missing parram wareHouseId" });
  }
};

module.exports.getAllPkgByReceiverId = async (req, res, next) => {
  if (req.body.id_receiver != undefined && req.body.wareHouseId != undefined) {
    await packages
      .findAll({
        where: {
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          shipments,
          {
            model: warehouse_package,
          },
          {
            model: package_user,
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        new Promise(async (resolve, reject) => {
          var _result = [];
          for (var i = 0; i < responsive.length; i++) {
            var element = JSON.parse(JSON.stringify(responsive[i]));
            if (
              element.pkg_receiver.customer_receiver.id == req.body.id_receiver
            ) {
              _result.push(element);
            }
          }

          resolve(_result);
        }).then((_result) => {
          res.json(_result);
        });
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  } else {
    return res.status(400).json({ success: false, mess: "Missing parram" });
  }
};

module.exports.getShippmentBrokenByWarehouseId = async (req, res, next) => {
  if (req.body.wareHouseId != undefined) {
    await packages
      .findAll({
        where: {
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          shipments,
          {
            model: warehouse_package,
          },
          {
            model: package_user,
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        new Promise(async (resolve, reject) => {
          var _result = [];
          for (var i = 0; i < responsive.length; i++) {
            if (responsive[i].warehouse_package != null) {
              if (responsive[i].warehouse_package.statusId != null) {
                if (responsive[i].warehouse_package.statusId == 5)
                  _result.push(responsive[i].shipment);
              }
            }
          }

          resolve(_result);
        }).then((_result) => {
          res.json(_result);
        });
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  } else {
    return res
      .status(400)
      .json({ success: false, mess: "Missing parram wareHouseId" });
  }
};

module.exports.getPKGBrokenByShipmentAndWarehouseId = async (
  req,
  res,
  next
) => {
  if (req.body.wareHouseId != undefined && req.body.shipmentId != undefined) {
    await packages
      .findAll({
        where: {
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          shipments,
          {
            model: warehouse_package,
          },
          {
            model: package_user,
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        new Promise(async (resolve, reject) => {
          var _result = [];
          for (var i = 0; i < responsive.length; i++) {
            if (responsive[i].shipmentId == req.body.shipmentId) {
              if (responsive[i].warehouse_package != null) {
                if (responsive[i].warehouse_package.statusId != null) {
                  if (responsive[i].warehouse_package.statusId == 5) {
                    _result.push(responsive[i]);
                  }
                }
              }
            }
          }

          resolve(_result);
        }).then((_result) => {
          res.json(_result);
        });
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  } else {
    return res
      .status(400)
      .json({ success: false, mess: "Missing parram wareHouseId" });
  }
};

module.exports.getPKGDoneByShipmentAndWarehouseId = async (req, res, next) => {
  if (req.body.wareHouseId != undefined && req.body.shipmentId != undefined) {
    await packages
      .findAll({
        where: {
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          shipments,
          {
            model: warehouse_package,
          },
          {
            model: package_user,
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        new Promise(async (resolve, reject) => {
          var _result = [];
          for (var i = 0; i < responsive.length; i++) {
            if (responsive[i].shipmentId == req.body.shipmentId) {
              if (responsive[i].warehouse_package != null) {
                if (responsive[i].warehouse_package.statusId != null) {
                  if (responsive[i].warehouse_package.statusId == 3) {
                    _result.push(responsive[i]);
                  }
                }
              }
            }
          }

          resolve(_result);
        }).then((_result) => {
          res.json(_result);
        });
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  } else {
    return res
      .status(400)
      .json({ success: false, mess: "Missing parram wareHouseId" });
  }
};

module.exports.getPKGReturningByShipmentAndWarehouseId = async (
  req,
  res,
  next
) => {
  if (req.body.wareHouseId != undefined && req.body.shipmentId != undefined) {
    await packages
      .findAll({
        where: {
          wareHouseId: req.body.wareHouseId,
        },
        include: [
          shipments,
          {
            model: warehouse_package,
          },
          {
            model: package_user,
          },
          {
            model: pkg_receiver,
            include: [
              {
                model: customer_receiver,
              },
            ],
          },
        ],
      })
      .then((responsive) => {
        responsive = _.sortBy(responsive, function (dateObj) {
          return new Date(dateObj.createdAt);
        });

        new Promise(async (resolve, reject) => {
          var _result = [];
          for (var i = 0; i < responsive.length; i++) {
            if (responsive[i].shipmentId == req.body.shipmentId) {
              if (responsive[i].warehouse_package != null) {
                if (responsive[i].warehouse_package.statusId != null) {
                  if (responsive[i].warehouse_package.statusId == 5) {
                    _result.push(responsive[i]);
                  }
                }
              }
            }
          }

          resolve(_result);
        }).then((_result) => {
          res.json(_result);
        });
      })
      .catch((e) => {
        throw next(new Error(`400:${e}`));
      });
  } else {
    return res
      .status(400)
      .json({ success: false, mess: "Missing parram wareHouseId" });
  }
};
