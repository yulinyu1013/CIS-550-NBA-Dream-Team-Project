const mysql = require('mysql2/promise');
require('dotenv').config();

// "rds_host": "mysql.cbxetj19oidu.us-east-2.rds.amazonaws.com",
//     "rds_port": "3306",
//     "rds_user": "admin",
//     "rds_password" : "Cis550Fall!",
//     "rds_db": "NBA"

const connect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
    console.log(`Connected to database: ${connection.connection.config.database}`);
    return connection;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

// Home Page

// Game Page

// Player Page

// Team Page


module.exports = {
  connect,

};