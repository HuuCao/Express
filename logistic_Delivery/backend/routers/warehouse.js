const router = require("express").Router();
const warehouseController = require("../controllers/warehouse");
const { authenticate } = require("../controllers/auth");

router
	.route("/")
	.post(authenticate([]), warehouseController.createWarehouse)
	.get(authenticate([]), warehouseController.getAllWareHouse);
router
	.route("/getallwarehousebycpnid")
	.post(authenticate([]), warehouseController.getAllWareHouseByCPNId);
module.exports = router;
