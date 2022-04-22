const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');
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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update an Employee Role', 'End Session']
        }
    ])
    .then(menu_choice => {
        console.log(menu_choice.menu_navigation_choice)
        if (menu_choice.menu_navigation_choice == 'View All Departments') {
            console.log(`

    You have chosen to view all departments! Please wait a moment as we display them below.

            `)
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
        else if (menu_choice.menu_navigation_choice == 'End Session') {
            console.log(`
            
    Okay~ Have a pleasant rest of your day!
            
            `)
        }
    })
}

start_menu()

// Default response for any other request (Not Found)
// PLACE AT THE BOTTOM OF THE CODE
// Will override any routes placed below it such as GET POST, etc
app.use((req, res) => {
    res.status(404).end();
  });