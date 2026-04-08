const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

require("./private/db.pri.js");

const { block } = require("./private/block.pri");
const { run: dbRun } = require('./private/db.pri');

app.post("/api/block", (req, res) => {
    const verdi = req.body.value;
    console.log("Mottatt verdi:", verdi);
    const blokk = block(verdi);
    res.json({
        blokk: blokk
    });
});

app.post("/api/register", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(userName, password);
    res.json({
        status: "ok"
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

