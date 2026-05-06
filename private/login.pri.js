const { get: dbGet } = require('./db.pri.js');
const bcrypt = require("bcryptjs");

async function login(body) {
    const { userName, password } = body || {};
    let sql = 'SELECT * FROM user WHERE username = ?;';
    let params = [userName];
    let result = await dbGet(sql, params);
    if (!result) {
        return { status: "error", message: "Invalid username or password" };
    }

    const ok = await bcrypt.compare(password, result.password);
    if (ok) {
        return {
            status: "success",
            message: "Login successful",
            idUser: result.idUser,
            userName: result.userName
        };
    }

    return { status: "error", message: "Invalid username or password" };
}

module.exports = { login };
