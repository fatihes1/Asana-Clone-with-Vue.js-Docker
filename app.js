const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send({
        messsage: "Res API ayakta...",
    })
})

app.listen(3232, () => {
    console.log("3232 Portu üzerinden çalışıyor.")
})