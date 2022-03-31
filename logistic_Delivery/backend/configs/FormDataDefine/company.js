module.exports.initialData = [
	"enName",
	"oriName",
	"viName",
	"otherName",
	"enAddress",
	"oriAddress",
	"viAddress",
	"tel",
	"expCode",
	"taxCode",
	"companyCode",
	"cellPhone",
	"representative",
	"type",
	"isActive",
];
module.exports.descriptorCreateCompany = {
	enName: {
		require: true,
	},
	oriName: {
		require: true,
	},
	viName: {
		require: true,
	},
	otherName: {
		require: true,
	},
	enAddress: {
		require: true,
	},
	oriAddress: {
		require: true,
	},
	viAddress: {
		require: true,
	},
	tel: {
		require: true,
	},
	expCode: {
		require: true,
	},
	taxCode: {
		require: true,
	},
	companyCode: {
		require: true,
	},
	cellPhone: {
		require: true,
	},
	representative: {
		require: true,
	},
	type: {
		require: true,
	},
	isActive: {
		type: "number",
		require: true,
	},
};
