const router = require("express").Router();
const orderController = require("../controllers/order");
const { authenticate } = require("../controllers/auth");

router.route("/create").post(authenticate([]), orderController.createOrder);

router
  .route("/update/:id")
  .patch(authenticate([]), orderController.updateOrder);
router
  .route("/delete/:id")
  .delete(authenticate([]), orderController.deleteOrder);

router.route("/getallorder").get(authenticate([]), orderController.getAllOrder);

router
  .route("/getorderbycustomername")
  .post(authenticate([]), orderController.getOrderByCustomerName);

router
  .route("/getorderbyidshipping")
  .get(authenticate([]), orderController.getOrderByIdShippingPartner);

router
  .route("/getorderbyalldates")
  .get(authenticate([]), orderController.getOrderByDates);

router.route("/scan").get(authenticate([]), orderController.scanOrder);

module.exports = router;
