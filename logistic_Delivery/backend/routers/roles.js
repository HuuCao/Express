const router = require("express").Router();
const { addPermission, removePermisson } = require("../controllers/roles");
const { authenticate } = require("../controllers/auth");
router.route("/addpermission").post(authenticate([]), addPermission);
module.exports = router;

router.route("/removepermission").post(authenticate([]), removePermisson);
module.exports = router;
