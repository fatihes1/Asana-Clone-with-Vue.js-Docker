const validate = require("../middlewares/validate"); // validate middleware
const schemas = require("../validations/Users"); // validations tanıtımı
const express = require("express");
const { create, index } = require("../controllers/Users")
const router = express.Router();

router.get("/", index);

router
.route("/")
.post(validate(schemas.createValidation), create);

module.exports = router;