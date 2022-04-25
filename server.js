const express = require('express');
const fetch = require('node-fetch');
const inquirer = require('inquirer');
const db = require('./db/connection');
const https = require('https');
const inputCheck = require('./inputcheck')
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

    const getEmployees = () => {
      fetch(`http://localhost:${PORT}/api/employees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    };

    return inquirer 
    .prompt([ 
        {
            type: 'list',
            name: 'menu_navigation_choice',
            message: 'What would you like to do today?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', "Update an Employee's information"]
        }
    ])
    // Choice chosen routes to one of several different actions within said function
    .then(menu_choice => {
        console.log(menu_choice.menu_navigation_choice)
        // DONE
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

            return start_menu();
            
        } // DONE
        else if (menu_choice.menu_navigation_choice == 'View All Roles') {
            console.log(`
        
    You have chosen to view all roles! Please wait a moment as we display them below.

            `)

            const getRoles = () => {
              fetch(`http://localhost:${PORT}/api/roles`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            };

            getRoles();

            return start_menu();
        } // DONE
        else if (menu_choice.menu_navigation_choice == 'View All Employees') {
            console.log(`
            
    You have chosen to view all employees! Please wait a moment as we display them below.

            `)
            
            getEmployees();

            return start_menu();
        } // DONE
        else if (menu_choice.menu_navigation_choice == 'Add A Department') {
            console.log(`
            
    You have chosen to add a department!
            
            `)

            return inquirer
            .prompt([
              {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?'
              }
            ])
            .then(dept_name => {
              console.log(dept_name)
              dept_name_string = JSON.stringify(dept_name)

              const addDepartment = () => {
                fetch(`http://localhost:${PORT}/api/department`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: dept_name_string,
                })
              };
  
              addDepartment();
  
              return start_menu();
            })
            
            // ADD INTO THE INQUIRER

        } // DONE
        else if (menu_choice.menu_navigation_choice == 'Add A Role') {
            console.log(`
            
    You have chosen to add a new role!

            `)

            return inquirer
            .prompt([
              {
                type: 'input',
                name: 'job_title',
                message: 'What is the name of the role?'
              },
              {
                type: 'input',
                name: 'job_salary',
                message: 'How much does this role get paid per year?'
              },
              {
                type: 'input',
                name: 'department_id',
                message: 'Which department does this role usually fall under?'
              }              
            ])
            .then(role_name => {
              console.log(typeof role_name)
              role_name_string = JSON.stringify(role_name)

              const addRole = () => {
                fetch(`http://localhost:${PORT}/api/role`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: role_name_string,
                })
              };
  
              addRole();
  
              return start_menu();
            })


        } // DONE
        else if (menu_choice.menu_navigation_choice == 'Add An Employee') {
            console.log(`
            
    You have chosen to add a new employee!
            
            `)

            return inquirer
            .prompt([
              {
                type: 'input',
                name: 'employee_first_name',
                message: 'What is the first name of the employee?'
              },
              {
                type: 'input',
                name: 'employee_last_name',
                message: 'What is the last name of the employee?'
              },
              {
                type: 'input',
                name: 'employee_job_id',
                message: 'What is their role/job id?'
              },
              {
                type: 'input',
                name: 'employee_department_id',
                message: 'What is the department id of the employee?'
              },
              {
                type: 'input',
                name: 'employee_salary',
                message: 'What is the salary of the employee?'
              },
              {
                type: 'input',
                name: 'employee_manager',
                message: 'Who is the manager of the employee?'
              }
            ])
            .then(employee_name => {
              employee_name_string = JSON.stringify(employee_name)

              const addEmployee = () => {
                fetch(`http://localhost:${PORT}/api/employee`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: employee_name_string,
                })
              };
  
              addEmployee();

              getEmployees();
  
              return start_menu();
            })

        }
        else if (menu_choice.menu_navigation_choice == "Update an Employee's information") {
            console.log(`
            
    You have chosen to update an employee's role!
            
            `)

            getEmployees();

            return inquirer
            .prompt([
              {
                type: 'number',
                name: 'update_employee_id',
                message: 'Enter the id of the employee you wish to update.'
              },
              {
                type: 'number',
                name: 'update_employee_role',
                message: 'What is the new role of the employee?'
              },
              {
                type: 'number',
                name: 'update_employee_department',
                message: 'What is the new department of the employee?'
              },
              {
                type: 'number',
                name: 'update_employee_salary',
                message: "What is the employee's new salary?"
              },
              {
                type: 'number',
                name: 'update_employee_manager',
                message: "What is the employee's new manager?"
              }
            ])
            .then(update_employee_role => {
              console.log(update_employee_role)
              update_employee_role_string = JSON.stringify(update_employee_role)
              const updated_employee_id = update_employee_role.updated_employee_id;

              const updateEmployee = () => {
                fetch(`http://localhost:${PORT}/api/employee/${updated_employee_id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: update_employee_role_string,
                })
              };
  
              updateEmployee();

              getEmployees();
  
              return start_menu();
            })
        }
    })
}

start_menu()

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
        console.log(`
              


        `);
        console.table(rows);
        console.log(`
           
        

        `);
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
        console.log(`
              


        `);
        console.table(rows);
        console.log(`
              


        `);
      });
})

// Add a Department
app.post('/api/department', ({ body }, res) => {
    console.log(body)
    const errors = inputCheck(body, 'department_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO departments (department_name)
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
      console.log(`
              


      `);
      console.table(body);
      console.log(`
         
      

      `);
    });
})

// ROLE INFORMATION

// Get all Roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.department_name  
    AS department_name
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;
    
      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows,
        });
        console.log(`
              


        `);
        console.table(rows);
        console.log(`
              


        `);
      });
      
    });

// Get a Single Role
app.get('/api/role/:id', (req, res) => {
    const sql = `SELECT roles.*, departments.department_name  
    AS department_name
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id
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
        console.log(`
              


        `);
        console.table(rows);
        console.log(`
              


        `);
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
      console.log(`
              


      `);
      console.table(body);
      console.log(`
         
      

      `);
    });
    
})

// EMPLOYEE INFORMATION

// Get all Employees
app.get('/api/employees', (req, res) => {
  const sql = ` SELECT employees.*, departments.department_name AS department_name, roles.job_title AS job_title
  FROM employees 
  LEFT JOIN departments    
  ON employees.employee_department_id = departments.id
  LEFT JOIN roles
  ON employees.employee_job_id = roles.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
      console.log(`
            


      `);
      console.table(rows);
      console.log(`
         
      

      `);
    });
    
  });

// Get a single Employee
app.get('/api/employee/:id', (req, res) => {
  const sql = ` SELECT employees.*, departments.department_name AS department_name, roles.job_title AS job_title
  FROM employees 
  LEFT JOIN departments    
  ON employees.employee_department_id = departments.id
  LEFT JOIN roles
  ON employees.employee_job_id = roles.id
  WHERE employees.id = ?`;
  const params = [req.params.id];
  
    db.query(sql, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
      console.log(`
            


      `);
      console.table(rows);
      console.log(`
         
      

      `);
    });
    
  });

// Add a new Employee
app.post('/api/employee', ({ body }, res) => {
  const errors = inputCheck(body, 'employee_first_name', 'employee_last_name', 'employee_job_id', 'employee_department_id', 'employee_salary', 'employee_manager');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO employees (employee_first_name, employee_last_name, employee_job_id, employee_department_id, employee_salary, employee_manager)
  VALUES (?,?,?,?,?,?)`;
  const params = [body.employee_first_name, body.employee_last_name, body.employee_job_id, body.employee_department_id, body.employee_salary, body.employee_manager];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
    console.log(`
              


    `);
    console.table(body);
    console.log(`
       
    

    `);
  });
})

// Update an Employee's Role
app.put('/api/employee/:id', (req, res) => {

  const errors = inputCheck(req.body, 'update_employee_id', 'update_employee_role', 'update_employee_department', 'update_employee_salary', 'update_employee_manager');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE employees
  SET employee_job_id = ?, employee_department_id = ?, employee_salary = ?, employee_manager = ?            
  WHERE id = ?`;
  const params = [req.body.update_employee_role, req.body.update_employee_department, req.body.update_employee_salary, req.body.update_employee_manager, req.body.update_employee_id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });      
    }
  });
});

// Default response for any other request (Not Found)
// PLACE AT THE BOTTOM OF THE CODE
// Will override any routes placed below it such as GET POST, etc
app.use((req, res) => {
    res.status(404).end();
  });

