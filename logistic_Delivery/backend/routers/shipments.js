const router = require("express").Router();
const shipmentController = require("../controllers/shipments");
const { authenticate } = require("../controllers/auth");

router
  .route("/")
  .get(authenticate([]), shipmentController.getAllShipment)
  .post(authenticate([]), shipmentController.createShipment);
router
  .route("/getshipmentbyId")
  .post(authenticate([]), shipmentController.getShipmentById);

router
  .route("/getshipmentbystatustext")
  .post(authenticate([]),shipmentController.getShipmentByStatusText);

router
  .route("/getshipmentbywarehouseid")
  .post(authenticate([]), shipmentController.getShipmentByIdWarehouse);

router
  .route("/getsumdebitshipment")
  .post(authenticate([]), shipmentController.getSumDebitShipment);

  
  router
  .route("/getshipmenthavepkgshipped")
  .post(authenticate([]), shipmentController.getShipmentHavePkgShipped);

  router
  .route("/getlastinvoiceno")
  .get(authenticate([]), shipmentController.getLastInvoiceShipment);

router
  .route("/getshipmentbycompanyid")
  .post(authenticate([]), shipmentController.getShipmentByCompanyId);

router
  .route("/generateInvoiceNo")
  .get(authenticate([]), shipmentController.generateInvoiceNo);
router
  .route("/:idShipment")
  .patch(authenticate([]), shipmentController.updateShipment)
  .get(authenticate([]), shipmentController.getShipment);
router
  .route("/invoice/:idShipment/close")
  .patch(authenticate([]), shipmentController.closeInvoice);
router
  .route("/close/:idShipment")
  .patch(authenticate([]), shipmentController.closeShipment);
module.exports = router;
