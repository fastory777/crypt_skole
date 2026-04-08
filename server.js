const express = require("express");
const crypto = require("crypto");
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

app.post("/api/register", async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

        if (!userName || !password) {
            return res.status(400).json({
                status: "error",
                message: "Username og passord må fylles ut"
            });
        }

        if (password.length < 4) {
            return res.status(400).json({
                status: "error",
                message: "Passord må være minst 4 tegn"
            });
        }

        const encryptedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        await dbRun(
            "INSERT INTO user (userName, password) VALUES (?, ?)",
            [userName, encryptedPassword]
        );

        console.log(userName, encryptedPassword);

        res.json({
            status: "ok",
            encryptedPassword: encryptedPassword
        });
    } catch (err) {
        if (err && err.message && err.message.includes("UNIQUE constraint failed")) {
            return res.status(409).json({
                status: "error",
                message: "Brukernavn finnes fra før"
            });
        }

        console.error(err);
        res.status(500).json({
            status: "error",
            message: "Noe gikk galt ved registrering"
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
