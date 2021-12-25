const validate = require("../middlewares/validate"); // validate middleware
const schemas = require("../validations/Users"); // validations tanıtımı
const express = require("express");
const authenticateToken = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const UserController = require("../controllers/User")
const router = express.Router();


router.get("/", UserController.index);
router.route("/").post(validate(schemas.createValidation), UserController.create);
router.route("/").patch(authenticateToken, validate(schemas.updateUserValidation), UserController.update);
router.route("/login").post(validate(schemas.loginValidation), UserController.login);
router.route("/projects").get(authenticateToken, UserController.projectList);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation), UserController.resetPassword);
router.route("/change-password").post(authenticateToken, validate(schemas.changePasswordValidation), UserController.changePassword);
router.route("/update-profile-image").post(authenticateToken,  UserController.updateProfileImage);
router.route("/:id").delete(idChecker(), authenticateToken, UserController.deleteUser);

module.exports = router;