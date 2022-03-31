const router = require("express").Router();
const companyControllers = require("../controllers/companies");
const { authenticate } = require("../controllers/auth");

router
	.route("/")
	.post(authenticate([]), companyControllers.createCompany)
	.get(authenticate([]), companyControllers.getAllCompanies);
router.route("/detail").get(authenticate([]), companyControllers.getDetailCompany);


router.route("/update").post(authenticate([]),companyControllers.updateCompanies);
module.exports = router;
