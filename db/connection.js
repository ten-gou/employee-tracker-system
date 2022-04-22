const mysql = require('mysql2');
const login = require('./env-login')


console.log(login)
console.log(login.DB_NAME)
// Connect to sql database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: `${login.DB_USER}`,
      // Your MySQL password
      password: `${login.DB_PASSWORD}`,
      database: `${login.DB_NAME}`
    },
    console.log('Connected to the Employee Tracker System.')
  );  

  module.exports = db;