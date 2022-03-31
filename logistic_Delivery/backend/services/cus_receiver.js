const { logisticDB } = require("../models");
const customer_receiver = logisticDB.customer_receiver;
const company_customer = logisticDB.company_customer;
const companies = logisticDB.companies;
const user = logisticDB.user;
const _ = require('lodash');

module.exports.createCustomerRecevier = (req, res, next) => {
  var body = req.body;
  customer_receiver
    .create(body)
    .then((responsive) => {
      if (body.companyId != undefined) {
        company_customer.create({
          customerId: responsive.id,
          companyId: body.companyId,
        });
      }
      res.send(responsive);
    })
    .catch((e) => {
      next(new Error(`400:${e}`));
    });
};

module.exports.updateCustomerRecevier = async (req, res, next) => {
  var body = req.body;
  var data = JSON.parse(JSON.stringify(body));
  delete data.id;
  var countCus = await customer_receiver.count({
    where: { id: body.id },
  });
  if (countCus == 1) {
    if (body.companycustomer != undefined) {
      var cpncus = await company_customer.findOne({
        where: {
          customerId: body.id,
        },
      });

      if (cpncus) {
        delete body.companycustomer.customerId;
        await company_customer
          .update(body.companycustomer, {
            where: {
              customerId: body.id,
            },
          })
          .catch((e) => {
            throw next(new Error(`400:${e}`));
          });
      } else {
        delete body.companycustomer.customerId;
        await company_customer
          .create({
            customerId: body.id,
            ...body.companycustomer,
          })
          .catch((e) => {
            throw next(new Error(`400:${e}`));
          });
      }
    }
    await customer_receiver
      .update(data, {
        where: {
          id: body.id,
        },
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
    next(new Error("404:Not Found Customer Receiver ID"));
  }
};

module.exports.getAllCustomerReceiver = async (req, res, next) => {
  let role = req.user.role;
  let userId = req.user.idUser;

  if (role == "client") {
    var dataUser = await user.findOne({
      where: {
        id: userId,
      },
    });

    if (dataUser != undefined) {
      customer_receiver
        .findAll({
          include: [
            {
              model: company_customer,
              where: {
                companyId: dataUser.companyId,
              },
              include: [companies],
            },
          ],
        })
        .then((responsive) => {
          if(req.query.companyId != undefined)
          {
            responsive = _.filter(responsive,(o)=>{
              if(o.company_customer.companyId == req.query.companyId)
                return o;
            })
          }

          var tempres = [];
          responsive.map((current) => {
            var temp = JSON.parse(JSON.stringify(current));
            delete temp.company_customers;
            tempres.push(temp);
          });
       
          if (req.query.search != undefined) {
            var result_receiver = [];
            for (var i = 0; i < tempres.length; i++) {
              if (
                new String(
                  tempres[i].phone
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                )
                  .toLocaleLowerCase()
                  .includes(
                    req.query.search
                      .toLocaleLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                  ) ||
                new String(
                  tempres[i].name
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
              ) {
                result_receiver.push(tempres[i]);
              }
            }

            res.send(result_receiver);
          } else {
            res.send(tempres);
          }
        })
        .catch((e) => {
          next(new Error(`400:${e}`));
        });
    } else {
      return res.send({ success: false, mess: "Not Found" });
    }
  } else {
    customer_receiver
      .findAll({
        include: [
          {
            model: company_customer,
            include: [companies],
          },
        ],
      })
      .then((responsive) => {
        if(req.query.companyId != undefined)
        {
          responsive = _.filter(responsive,(o)=>{
            if(o.company_customer.companyId == req.query.companyId)
              return o;
          })
        }
       
        var tempres = [];
        responsive.map((current) => {
          var temp = JSON.parse(JSON.stringify(current));
          delete temp.company_customers;
          tempres.push(temp);
        });
     
        if (req.query.search != undefined) {
          var result_receiver = [];
          for (var i = 0; i < tempres.length; i++) {
            if (
              new String(
                tempres[i].phone
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
                .toLocaleLowerCase()
                .includes(
                  req.query.search
                    .toLocaleLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                ) ||
              new String(
                tempres[i].name
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
            ) {
              result_receiver.push(tempres[i]);
            }
          }

          res.send(result_receiver);
        } else {
          res.send(tempres);
        }
      })
      .catch((e) => {
        next(new Error(`400:${e}`));
      });
  }
};
