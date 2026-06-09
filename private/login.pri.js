const { get: dbGet } = require('./db.pri.js');
const bcrypt = require("bcryptjs");

async function login(body) {
    const { userName, password } = body || {};
    let sql = 'SELECT * FROM user WHERE userName = ?;';
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

async function isAdmin(idUser) {
    let sql = 'SELECT is_admin FROM user WHERE idUser = ?;';
    let params = [idUser];
    let result = await dbGet(sql, params);
    return !!result?.is_admin;
}

module.exports = { login, isAdmin };
