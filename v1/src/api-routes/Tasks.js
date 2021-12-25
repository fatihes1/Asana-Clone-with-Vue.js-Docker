// validate middleware
const validate = require("../middlewares/validate");
// validations tanıtımı
const schemas = require("../validations/Tasks");
const express = require("express");
const TaskController = require("../controllers/Task");
const authenticateToken = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const router = express.Router();

// index için token gerekiyor artık ! 

router.route("/").get(authenticateToken, TaskController.index);
router.route("/").post(authenticateToken, validate(schemas.createValidation), TaskController.create);
router.route("/:id").patch(idChecker(), authenticateToken, validate(schemas.updateValidation), TaskController.update);
router.route("/:id").delete(idChecker(), authenticateToken, TaskController.deleteTask);
router.route("/:id/make-comment").post(idChecker(), authenticateToken, validate(schemas.commentValidation), TaskController.makeComment);
router.route("/:id/:commentId").delete(idChecker(), authenticateToken, TaskController.deleteComment);
router.route("/:id/add-sub-task").post(idChecker(), authenticateToken, validate(schemas.createValidation), TaskController.addSubTask);
router.route("/:id").get(idChecker(), authenticateToken, TaskController.fetchTask);



module.exports = router;