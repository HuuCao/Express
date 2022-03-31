const _ = require("lodash");
const { logisticDB } = require("../models");
const warehouse = logisticDB.warehouse;

module.exports.createWarehouse = async (body, actor) => {
	const count = await warehouse.count({
		where: {
			name: body.name,
		},
	});
	if (count > 0) {
		throw new Error("400:Company'name does exist");
	}
	return warehouse.create(body);
};

module.exports.getAllWareHouse = async (req,res,next) => {
	try
	{
		if(req.query.search != undefined)
		{
			var listWarehouse = await warehouse.findAll({});
			var result = _.filter(listWarehouse,(o)=>{
				if(new String(o.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLocaleLowerCase().includes(req.query.search.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
				{
					return o;
				}
			});
			return res.send({success:true,data:result});
		}else
		{
			var listWarehouse = await warehouse.findAll({});
			return res.send({success:true,data:listWarehouse});
		}
	}catch(e)
	{
		next(new Error(`404:${e}`));
	}
	
};

module.exports.getAllWareHouseByCPNId = async (req, res, next) => {
	let body = req.body;
	return warehouse
		.findAll({
			where: {
				companyId: body.companyId,
			},
		})
		.then((responsive) => res.send(responsive))
		.catch((e) => {
			next(new Error(`404:${e}`));
		});
};

