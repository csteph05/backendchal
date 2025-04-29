const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "backendchallenge",
  database: "db_Quizzes",
});

db.connect((err) => {
  if (err) {
    console.error("Connection failed", err);
    process.exit(1);
  } else {
    console.log("Connection Successful");
  }
});

module.exports = db;
