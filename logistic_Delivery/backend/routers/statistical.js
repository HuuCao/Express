const router = require("express").Router();
const statisticalController = require("../controllers/statistical");
const { authenticate } = require("../controllers/auth");

router
  .route("/totalcharge")
  .get(authenticate([]), statisticalController.getTotalCharge)

router
  .route("/count")
  .get(authenticate([]),statisticalController.countOrder);

router
  .route("/lookup")
  .get(authenticate([]),statisticalController.orderLookup);

module.exports = router;