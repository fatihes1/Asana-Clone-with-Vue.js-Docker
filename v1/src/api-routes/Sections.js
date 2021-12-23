// validate middleware
const validate = require("../middlewares/validate");
// validations tanıtımı
const schemas = require("../validations/Sections");
const express = require("express");
const SectionController= require("../controllers/Section");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

// index için token gerekiyor artık ! 
router.route("/:projectId").get(authenticateToken, SectionController.index);
router.route("/").post(authenticateToken, validate(schemas.createValidation), SectionController.create);
router.route("/:id").patch(authenticateToken, validate(schemas.updateValidation), SectionController.update);
router.route("/:id").delete(authenticateToken, SectionController.deleteSection);


module.exports = router;