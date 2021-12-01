const express = require("express");
const helmet = require("helmet");
const { ProjectRoutes } = require("./api-routes");

const config = require("./config");
const loaders = require("./loaders");

config();
loaders();

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu ayağa kaldırıldı !");
    app.use("/projects",ProjectRoutes.router);
});