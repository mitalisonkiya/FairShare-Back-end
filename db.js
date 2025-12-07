const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./fairshare.db", (err) => {
    if (err) console.log("DB Connection Error:", err);
    else console.log("SQLite Connected");
});

// ============= CREATE TABLES IF NOT EXIST =============

db.serialize(() => {

    // USERS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);

    // GROUPS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            owner_id INTEGER
        )
    `);

    // MEMBERS TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER,
            name TEXT,
            email TEXT
        )
    `);

    // EXPENSES TABLE
    db.run(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER,
            title TEXT,
            amount REAL,
            paid_by TEXT,
            created_at DATETIME
        )
    `);
db.run(
    `INSERT INTO group_invites (group_id, email, token) VALUES (?, ?, ?)`,
    [group_id, email, token]
);

});

module.exports = db;
