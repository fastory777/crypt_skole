const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;
const sessionCookieName = "connect.sid";
const sessionCookieOptions = {
    maxAge: 1000 * 60 * 30, // 30 minutter
    path: "/"
};

app.use(express.static("public"));
app.use(express.json());
app.use(session({
    name: sessionCookieName,
    secret: "hemmelig-nøkkel",
    resave: false,
    saveUninitialized: false,
    cookie: sessionCookieOptions
}));

require("./private/db.pri.js");

const { block } = require("./private/block.pri");
const { register, reset } = require("./private/register.pri.js");
const { logout } = require("./private/logout.pri.js");
const { login, isAdmin } = require("./private/login.pri.js");
const { substitution } = require("./private/substitution.pri.js");
const { userList } = require("./private/users.pri.js");


app.post("/api/block", (req, res) => {
    const verdi = req.body.value;
    // console.log("Mottatt verdi:", verdi);
    const blokk = block(verdi);
    res.json({
        blokk: blokk
    });
});

app.post("/api/substitution", (req, res) => {
    const verdi = req.body.value || "";
    const kryptert = substitution(verdi);
    res.json({
        substitution: kryptert
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
    // console.log(req.body);
    try {
        const result = await login(req.body);
        if (result.status === "success") {
            req.session.userId = result.idUser;
            req.session.userName = result.userName;
            req.session.isAdmin = await isAdmin(result.idUser);
            // console.log(req.session);
        }
        res.json(result);
        // console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.get("/api/session", (req, res) => {
    res.json({
        userId: req.session.userId || null,
        userName: req.session.userName || null
    });
});

app.post("/api/logout", async (req, res) => {
    try {
        const result = await logout(req);
        res.clearCookie(sessionCookieName, { path: sessionCookieOptions.path });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});

app.get("/api/admin", async (req, res) => {
    if (!req.session.userId) {
        res.json({ isAdmin: false });
        return;
    }

    const admin = await isAdmin(req.session.userId);
    req.session.isAdmin = admin;
    res.json({ isAdmin: admin });
});

app.get("/api/users", async (req, res) => {
    try {
        if (!req.session.userId || !(await isAdmin(req.session.userId))) {
            res.status(403).json({ status: "error", message: "Admins only" });
            return;
        }

        const result = await userList();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
});


async function resetPasswordRoute(req, res) {
    try {
        const userName = req.session.userName;
        const { oldPassword, password, newPassword, confirmPassword } = req.body || {};
        const nextPassword = password || newPassword;

        if (!userName) {
            res.status(401).json({ status: "error", message: "You must be logged in" });
            return;
        }

        if (!oldPassword || !nextPassword) {
            res.status(400).json({ status: "error", message: "Fill in all password fields" });
            return;
        }

        if (confirmPassword && nextPassword !== confirmPassword) {
            res.status(400).json({ status: "error", message: "New passwords do not match" });
            return;
        }

        const loginPayload = {
            userName: userName,
            password: oldPassword
        };
        const loginResult = await login(loginPayload);
        // console.log("login-module check (old password):", loginResult);

        if (loginResult.status !== "success") {
            res.status(400).json({ status: "error", message: "Old password is wrong" });
            return;
        }

        const resetPayload = {
            userName: userName,
            password: nextPassword
        };
        const resetResult = await reset(resetPayload);
        // console.log("reset-module:", resetResult);

        res.json({
            status: "success",
            message: "Password updated",
            userName: userName,
            reset: resetResult
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
}

app.post("/api/reset", resetPasswordRoute);
app.post("/api/reset-password", resetPasswordRoute);

const server = app.listen(port, () => {
    if (server.address()) {
        console.info(`Server running on http://localhost:${port}`);
    }
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Stop the other server or run with PORT=3001 node server.js`);
        return;
    }

    console.error(err.message);
});
