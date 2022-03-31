const router = require("express").Router();
const { getAllReason } = require("../controllers/reason");

router.route("/").get(getAllReason);

module.exports = router;
