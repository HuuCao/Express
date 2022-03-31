const router = require("express").Router();
const debitController = require("../controllers/debit");
const { authenticate } = require("../controllers/auth");

router
  .route("/getdebitbyiduser")
  .get(authenticate([]), debitController.getDebitByIdUser);

router
  .route("/getalldebit")
  .get(authenticate([]), debitController.getAllDebitCustomer);

router
  .route("/")
  .get(authenticate([]), debitController.getAllDebit);

router
  .route("/updatedebit/:id")
  .patch(authenticate([]), debitController.updateDebit);

router
  .route("/updatereceived")
  .post(authenticate([]), debitController.updateReceived);

router
  .route("/getdebitbytime")
  .get(authenticate([]), debitController.getDebitByTime);

router
  .route("/getdebitbyidshipping")
  .get(authenticate([]), debitController.getDebitByIdShipping);

router
  .route("/gettotalcharge")
  .get(authenticate([]), debitController.getTotalCharge);

module.exports = router;
