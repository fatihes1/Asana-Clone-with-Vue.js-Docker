const express = require("express");
const helmet = require("helmet");

const config = require("./config");
config();

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu ayağa kaldırıldı !");
});