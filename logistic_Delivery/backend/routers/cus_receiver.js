const router = require("express").Router();
const {
	createCustomerRecevier,
	updateCustomerRecevier,
	getAllCustomerReceiver,
} = require("../controllers/cus_receiver");
const { authenticate } = require("../controllers/auth");

router.route("/").get(authenticate([]), getAllCustomerReceiver);
router.route("/").post(authenticate([]), createCustomerRecevier);
router.route("/update").post(updateCustomerRecevier);

module.exports = router;
