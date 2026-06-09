const { all: dbAll } = require("./db.pri.js");

async function userList() {
    const sql = "SELECT idUser, userName, is_admin FROM user ORDER BY idUser ASC;";
    const result = await dbAll(sql);
    return { result };
}

module.exports = { userList };
