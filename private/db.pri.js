const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(path.join(__dirname, 'crypt.db'));

db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON;');

    db.run(`
        CREATE TABLE IF NOT EXISTS user (
            idUser INTEGER PRIMARY KEY AUTOINCREMENT,
            userName VARCHAR(45) NOT NULL UNIQUE,
            password VARCHAR(45) NOT NULL
        );
    `);

});

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({
                changes: this.changes, // antall rader som ble endret
                lastID: this.lastID // ID for siste innsetting (hvis INSERT)
            });
        });
    });
}

module.exports = { run };