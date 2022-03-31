const router = require("express").Router();
const { getAllShipper, getAllShipperByWhId ,
    getPkgHistoryByShipper,getShipperCodConfirmByWhId,
    getAllShipperByCompanyId ,getSumCodNeedConfirm,getShippingMethod} = require("../controllers/shipper");
const { authenticate } = require("../controllers/auth");

router.route("/getallshipper").get(authenticate([]), getAllShipper);
router.route("/methods").get(authenticate([]), getShippingMethod);
router.route("/getallshipperbywhId").post(authenticate([]), getAllShipperByWhId);
router.route("/getpkghistorybyshipper").post(authenticate([]), getPkgHistoryByShipper);
router.route("/getshippercodconfirmbywhid").post(authenticate([]), getShipperCodConfirmByWhId);
router.route("/getallshipperbycompanyid").post(authenticate([]), getAllShipperByCompanyId );
router.route("/getsumcodneedconfirm").post(authenticate([]), getSumCodNeedConfirm );
module.exports = router;
