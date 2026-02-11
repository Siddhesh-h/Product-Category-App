require("dotenv").config();
const mysql = require("mysql2");

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "product_app",
};

let connection;

function connectWithRetry() {
    connection = mysql.createConnection(dbConfig);

    console.log("Connecting to MySQL...");

    connection.connect((err) => {
        if (err) {
            setTimeout(connectWithRetry, 3000); // silent retry
        } else {
            console.log("MySQL connected successfully");
        }
    });
}

connectWithRetry();

module.exports = {
    getConnection: () => connection,
};
