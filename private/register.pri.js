const { run: dbRun } = require("./db.pri.js");
const bcrypt = require("bcryptjs");

async function register(body) {
    const { userName, password } = body || {};
    const encryptedPassword = await bcrypt.hash(password, 10);
    // console.log(userName, encryptedPassword);

    const sql = "INSERT INTO user (userName, password) VALUES (?, ?);";
    const params = [userName, encryptedPassword];
    const result = await dbRun(sql, params);

    // console.log(result);
    return { result };
}

async function reset(body) {
    const { userName, password } = body || {};
    const encryptedPassword = await bcrypt.hash(password, 10);
    // console.log(userName, encryptedPassword);

    const sql = "UPDATE user SET password = ? WHERE userName = ?;";
    const params = [encryptedPassword, userName];
    const result = await dbRun(sql, params);

    // console.log(result);
    return { result };
}

module.exports = { register, reset };
