const router = require("express").Router();
const userController = require("../controllers/users");
const { authenticate } = require("../controllers/auth");

router.route("/").get(authenticate([]), userController.getAllUser);
router.route("/:id").delete(authenticate([]), userController.deleteUser);
router.route("/:id").patch(authenticate([]), userController.updateUser);
router.route("/detail").get(authenticate([]), userController.getuserDetail);
router
  .route("/getuserbyrole")
  .get(authenticate([]), userController.getUserByRole);
router.route("/getallrole").get(authenticate([]), userController.getAllRole);
router.route("/create").post(authenticate([]), userController.addUser);

module.exports = router;
