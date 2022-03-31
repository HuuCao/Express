const router = require("express").Router();
const {
	createPackage,
	updatePackage,
	getPackageByStatus,
	reWareHouse,
	addPackageError,
	updateStatusPackage,
	updatesrclinkPackage,
	updateCodReceivedPackage,
	getPackageSuccess,
	getPackageErrorByWhId,
	getPackageByShipmentId,
	deletePackageByPackageId,
	getPackageByShipperId,
	getPackageByWarehouseId,
	getPackageDoneCodByShipperId,
	getallpackagewarehousebystatus,
	updateaccounteenconfirmpackage,
	getAllCustomerPreparingByWarehouseId,
	getAllPkgByReceiverId,
	getShippmentBrokenByWarehouseId,
	getPKGBrokenByShipmentAndWarehouseId,
	getPKGDoneByShipmentAndWarehouseId,
	getPKGReturningByShipmentAndWarehouseId,
	createPackageInShipment
} = require("../controllers/package");
const {createBagByShipmentId,allBagByShipmentId } = require('../controllers/bags');
const { authenticate } = require("../controllers/auth");

router.route("/").post(authenticate([]), createPackage);
router.route("/createpkg").post(authenticate([]), createPackageInShipment);
router.route("/get/:statusText").get(authenticate([]), getPackageByStatus);

router.route("/update").post(authenticate([]), updatePackage);
router.route("/addpackageerror").post(authenticate([]), addPackageError);
router.route("/rewarehouse").post(authenticate([]), reWareHouse);
router.route("/updatestatus").post(authenticate([]), updateStatusPackage);
router.route("/updatesourcelink").post(authenticate([]), updatesrclinkPackage);
router.route("/updatecodreceived").post(authenticate([]), updateCodReceivedPackage);
router.route("/getallsuccess").get(authenticate([]), getPackageSuccess);
router.route("/getpackageerrorbywhid").post(authenticate([]), getPackageErrorByWhId);
router.route("/getpackagebyshipmentid").post(authenticate([]), getPackageByShipmentId);
router.route("/deletepackagebypackageid").post(authenticate([]), deletePackageByPackageId);
router.route("/getpackagebyshipperid").post(authenticate([]), getPackageByShipperId);
router.route("/getallpackagewarehousebystatus").post(authenticate([]), getallpackagewarehousebystatus);
router.route("/updateaccounteenconfirmpackage").post(authenticate([]), updateaccounteenconfirmpackage);

router.route("/getpackagedonebyshipperid").post(authenticate([]), getPackageDoneCodByShipperId);
router.route("/getpackagebywarehouseid").post(authenticate([]), getPackageByWarehouseId);
router.route("/getallcustomerpreparingbywarehouseid").post(authenticate([]), getAllCustomerPreparingByWarehouseId);
router.route("/getallpkgbyreceiverid").post(authenticate([]), getAllPkgByReceiverId);
router.route("/getshippmentbrokenbywarehouseid").post(authenticate([]), getShippmentBrokenByWarehouseId);
router.route("/getpkgbrokenbyshipmentandwarehouseid").post(authenticate([]), getPKGBrokenByShipmentAndWarehouseId);
router.route("/getpkgdonebyshipmentandwarehouseid").post(authenticate([]), getPKGDoneByShipmentAndWarehouseId);
router.route("/getpkgreturningbyshipmentandwarehouseid").post(authenticate([]), getPKGReturningByShipmentAndWarehouseId);

// bags
router.route("/createbagbyshipmentid").post(authenticate([]), createBagByShipmentId);
router.route("/getallbagbyshipmentid").post(authenticate([]), allBagByShipmentId );


module.exports = router;
