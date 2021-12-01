// validations tanıtımı
// validate middleware
const express = require("express");
const { create, index } = require("../controllers/Projects")
const router = express.Router();

router.get("/", index);
router.post("/", create);

module.exports = {
    router,
};