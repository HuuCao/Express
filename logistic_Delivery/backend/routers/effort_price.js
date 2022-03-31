const router = require("express").Router();
const {
  getAllEffortPrice,
  createEffortPrice,
  updateEffortPrice,
  getOneEffortPrice,
  removeEffortPricePkg,
  removeEffortPrice
} = require("../controllers/effort_price");
const { authenticate } = require("../controllers/auth");

router.route("/create").post(authenticate([]), createEffortPrice);
router.route("/update/:id").patch(authenticate([]), updateEffortPrice);
router.route("/getall").get(authenticate([]), getAllEffortPrice);
router.route("/getone").get(authenticate([]), getOneEffortPrice);
router.route("/remove/:id").delete(authenticate([]), removeEffortPrice);
router.route("/remove_package").post(authenticate([]), removeEffortPricePkg);

module.exports = router;
