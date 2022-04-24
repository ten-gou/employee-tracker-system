const express = require('express');
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const db = require('./db/connection');
const https = require('https');
const { type } = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Main Menu
const start_menu = () => {
    console.log(`

    Welcome to the Employee Tracker System!

    `);

    return inquirer 
    .prompt([ 
        {
            type: 'list',
            name: 'menu_navigation_choice',
            message: 'What would you like to do today?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update an Employee Role']
        }
    ])
    // Choice chosen routes to one of several different actions within said function
    .then(menu_choice => {
        console.log(menu_choice.menu_navigation_choice)
        if (menu_choice.menu_navigation_choice == 'View All Departments') {
            console.log(`

    You have chosen to view all departments! Please wait a moment as we display them below.

            `);

            const getDepartments = () => {
              fetch(`http://localhost:${PORT}/api/departments`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            };

            getDepartments();
            
        }
        else if (menu_choice.menu_navigation_choice == 'View All Roles') {
            console.log(`
        
    You have chosen to view all roles! Please wait a moment as we display them below.

            `)
        }
        else if (menu_choice.menu_navigation_choice == 'View All Employees') {
            console.log(`
            
    You have chosen to view all employees! Please wait a moment as we display them below.

            `)
        }
        else if (menu_choice.menu_navigation_choice == 'Add A Department') {
            console.log(`
            
    You have chosen to add a department!
            
            `)
        }
        else if (menu_choice.menu_navigation_choice == 'Add A Role') {
            console.log(`
            
    You have chosen to add a new role!

            `)
        }
        else if (menu_choice.menu_navigation_choice == 'Add An Employee') {
            console.log(`
            
    You have chosen to add a new employee!
            
            `)

        }
        else if (menu_choice.menu_navigation_choice == 'Update an Employee Role') {
            console.log(`
            
    You have chosen to update an employee's role!
            
            `)
        }
    })
}

// End of Function, hopefully
const end_function = () => {
            console.log(`

Okay~ Have a pleasant rest of your day!

            `)
}

start_menu().then(end_function);

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
      console.log(`
Server running on port ${PORT}!
      `);
    });
  });

// DEPARTMENT INFORMATION

// Get All Departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
    
      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows,
        });
        console.table(rows);
      });
      
    });

// Get a Single Department
app.get('/api/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments
    WHERE departments.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows,
        });
        console.table(rows);
      });
})

// Add a Department
app.post('/api/department', ({ body }, res) => {
    const errors = inputCheck(body, 'department_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO roles (department_name)
    VALUES (?)`;
    const params = [body.department_name];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
})

// ROLE INFORMATION

// Get all Roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
    
      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows,
        });
        console.table(rows);
      });
      
    });

// Get a Single Role
app.get('/api/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles
    WHERE roles.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows,
        });
        console.table(rows);
      });
})

// Add a new Role
app.post('/api/role', ({ body }, res) => {
    const errors = inputCheck(body, 'job_title', 'job_salary', 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO roles (job_title, job_salary, department_id)
    VALUES (?,?,?)`;
    const params = [body.job_title, body.job_salary, body.department_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
})

// Default response for any other request (Not Found)
// PLACE AT THE BOTTOM OF THE CODE
// Will override any routes placed below it such as GET POST, etc
app.use((req, res) => {
    res.status(404).end();
  });

