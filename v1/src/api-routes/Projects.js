// validate middleware
const validate = require("../middlewares/validate");
// validations tanıtımı
const schemas = require("../validations/Projects");
const express = require("express");
const { create, index } = require("../controllers/Projects")
const router = express.Router();

router.get("/", index);

router
.route("/")
.post(validate(schemas.createValidation), create);

module.exports = router;