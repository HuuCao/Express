const router = require("express").Router();
const cardController = require("../controllers/card_io");
const { authenticate } = require("../controllers/auth");

router
  .route("/createcardin")
  .post(authenticate([]), cardController.createCardIn);

router
  .route("/createcardout")
  .post(authenticate([]), cardController.createCardOut);

router
  .route("/update/:id")
  .patch(authenticate([]), cardController.updateCard);

router
  .route("/")
  .get(authenticate([]), cardController.getAllCard);

router
  .route("/inventory")
  .get(authenticate([]), cardController.getOrderInventory);

module.exports = router;
