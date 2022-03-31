const router = require("express").Router();
const shippingController = require("../controllers/shipping_partner");
const { authenticate } = require("../controllers/auth");

router
    .route("/create")
    .post(authenticate([]), shippingController.createShippingPartner)

router
    .route("/getall")
    .get(authenticate([]), shippingController.getAllShippingPartner)

router
    .route("/update/:id")
    .patch(authenticate([]),shippingController.updateShippingPartner);

module.exports = router;