const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Siddhesh23@",
    database: "product_app",
});

db.connect((err) => {
    if (err) {
        console.error("MYQL connection failed:", err.message);
        return;
    }
    console.log("MySQL Connected");
});

module.exports = db;
