const _ = require("lodash");
const { logisticDB } = require("../models");
const companies = logisticDB.companies;
const user = logisticDB.user;
const effort_prices = logisticDB.effort_prices;
const warehouse = logisticDB.warehouse;

module.exports.createCompany = async (body, actor) => {
  try {
    const count = await companies.count({
      where: {
        enName: body.enName,
      },
    });
    if (count > 0) {
      throw new Error("400:Company'name does exist");
    }

    var _companies = await companies.create(body);

    if (body.effort_prices != null) {
      body.effort_prices.companyId = _companies.id;
      var eff_price = await effort_prices.create(body.effort_prices);
      _companies.effort_prices =  Object.assign({},eff_price);
    }
    return _companies;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getDetailCompany = async (userId) => {
  try {
    const user = await user.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: companies,
          as: "company",
        },
      ],
    });
    return user.company;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllCompanies = async (req, res, next) => {
  try {
    
    var listCompanies = await companies.findAll({
      include:[
        effort_prices
      ]
    });

	if(req.query.search != undefined)
	{
		listCompanies = _.filter(listCompanies,(o)=>{
			if(new String(o.enName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLocaleLowerCase().includes(req.query.search.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
			|| (new String(o.oriName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLocaleLowerCase().includes(req.query.search.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
			|| (new String(o.viName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLocaleLowerCase().includes(req.query.search.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
			|| (new String(o.tel.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLocaleLowerCase().includes(req.query.search.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
			)
			{
				return o;
			}
		});
	}
	

	return res.send({success:true,data:listCompanies});
  
  } catch (e) {
    next(new Error("404:Error "+e));
  }
};

module.exports.updateCompanies = async (req, res, next) => {
  if (req.body.id_company != undefined) {
    var Company = await companies.findOne({
      id: req.body.id_company,
    });

    if (Company != undefined) {
      if (req.body.effort_prices != null) {
        await effort_prices.update(
          {
            type_cal: req.body.effort_prices.type_cal,
            cost_per_kg: req.body.effort_prices.cost_per_kg,
          },
          {
            where: {
              companyId: req.body.id_company,
            },
          }
        );
      }

      return res.send({ success: true });
    } else {
      next(new Error("404:Not Found Company"));
    }

    return res.send({ success: true, data: listCompanies });
  } else {
    next(new Error("404:Missing parram id_company"));
  }
};
