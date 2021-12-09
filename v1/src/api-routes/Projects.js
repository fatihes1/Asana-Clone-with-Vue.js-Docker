// validate middleware
const validate = require("../middlewares/validate");
// validations tanıtımı
const schemas = require("../validations/Projects");
const express = require("express");
const { index, create, update } = require("../controllers/Projects");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

// index için token gerekiyor artık ! 
router.route("/").get(authenticateToken, index);
router.route("/").post(authenticateToken, validate(schemas.createValidation), create);
router.route("/:id").patch(authenticateToken, validate(schemas.updateValidation), update);

module.exports = router;