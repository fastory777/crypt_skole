const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

require("./private/db.pri.js");

const { block } = require("./private/block.pri");
const { run: dbRun } = require("./private/db.pri.js");
const { register } = require("./private/register.pri.js");
const { login } = require("./private/login.pri.js");


app.post("/api/block", (req, res) => {
    const verdi = req.body.value;
    console.log("Mottatt verdi:", verdi);
    const blokk = block(verdi);
    res.json({
        blokk: blokk
    });
});

app.post("/api/register", async (req, res) => {
    try {
        const result = await register(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const result = await login(req.body);
        res.json(result);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});