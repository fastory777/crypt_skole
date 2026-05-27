const { run: dbRun, get: dbGet } = require("../private/db.pri.js");

const username = process.argv[2];
console.log(JSON.stringify(process.argv));

if (!username) {
    console.error("Bruk: node ./new_admin.js <username>");
    process.exit(1);
}

dbRun("UPDATE user SET is_admin = 1 WHERE userName = ?;", [username])
    .then((result) => {
        if (result.changes === 0) {
            console.log(`Fant ingen bruker med username: ${username}`);
            process.exit(1);
        }

        console.log(`${username} er nå admin.`);
        return dbGet("SELECT * FROM user WHERE userName = ?;", [username]);
    })
    .then((user) => {
        console.log(JSON.stringify(user, null, 2));
        process.exit(0);
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
