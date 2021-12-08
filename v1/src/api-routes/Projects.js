// validate middleware
const validate = require("../middlewares/validate");
// validations tanıtımı
const schemas = require("../validations/Projects");
const express = require("express");
const { create, index } = require("../controllers/Projects");
const authenticateToken = require("../middlewares/authenticate");
const router = express.Router();

// index için token gerekiyor artık ! 
router.route("/").get(authenticateToken, index);

router
.route("/")
.post(authenticateToken, validate(schemas.createValidation), create);

module.exports = router;