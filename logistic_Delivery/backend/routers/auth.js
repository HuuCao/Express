const router = require("express").Router();
const { authenticate, handleLogin, register, sendOTP, verifyOTP, changePass } = require("../controllers/auth");

router.route("/login").post(handleLogin);
router.route("/register").post(register);
router.route("/sendotp").post(sendOTP);
router.route("/verifyotp").post(verifyOTP);
router.route("/changepass").post(changePass);

module.exports = router;
