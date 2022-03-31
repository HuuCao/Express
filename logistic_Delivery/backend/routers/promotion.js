const router = require("express").Router();
const promotionController = require("../controllers/promotion");
const { authenticate } = require("../controllers/auth");

router
  .route("/create")
  .post(authenticate([]), promotionController.createPromotion)

router
    .route("/update/:id")
    .patch(authenticate([]),promotionController.updatePromotion);

router
    .route("/getallpromotion")
    .get(authenticate([]),promotionController.getAllPromotion);

// router
//     .route("/getorderbyidcustomer")
//     .get(authenticate([]),orderController.getOrderByIdCustomer);

// router
//     .route("/getorderbyidshipping")
//     .get(authenticate([]),orderController.getOrderByIdShippingPartner);

// router
//     .route("/getorderbyalldates")
//     .get(authenticate([]),orderController.getOrderByDates);

module.exports = router;
