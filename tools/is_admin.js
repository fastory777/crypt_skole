const { run: dbRun, get: dbGet } = require('../private/db.pri.js');

dbRun('ALTER TABLE user ADD is_admin TINYINT DEFAULT 0;')
    .catch((err) => {
        if (!err.message.includes('duplicate column name')) {
            throw err;
        }
    })
    .then(() => dbGet('SELECT * FROM user ORDER BY idUser DESC LIMIT 1;'))
    .then((user) => {
        console.log(JSON.stringify(user, null, 2));
        process.exit(0);
    })
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
