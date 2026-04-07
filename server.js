const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

const { block } = require("./private/block.pri");

app.post("/api/block", (req, res) => {
    const verdi = req.body.value;
    console.log("Mottatt verdi:", verdi);
    const blokk = block(verdi);
    res.json({
        blokk: blokk
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

