const { run: dbRun } = require("./db.pri.js");
const { block } = require("./block.pri.js");

async function register(body) {
    const { userName, password } = body || {};
    const encryptedPassword = block(password || "");
    console.log(userName, encryptedPassword);

    const sql = "INSERT INTO user (userName, password) VALUES (?, ?);";
    const params = [userName, encryptedPassword];
    const result = await dbRun(sql, params);

    console.log(result);
    return { result };
}

module.exports = { register };