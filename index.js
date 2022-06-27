const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'workplace_db'
  });

  function runProgram(){
    inquirer.prompt ([
      {
        type: "list", 
        message: "What would you like to do?",
        name: "options",
        choices: [
        "Add Employee", 
        "View all Employees", 
        "Remove Employee",
        "Add Department", 
        "View all Departments",
        "Add Roles", 
        "View all Roles", 
        "Update Employee Role", 
        "Exit"
      ]
    }
    ]).then (function(res){
      switch (res.options){
        
      case "Add Employee":
      addEmployee();
      break;
     
      case "View all Employees":
      viewAllEmployees();
      break; 

      case "Remove Employee": 
      removeEmployee(); 
      break;
    
      case "Add Department": 
      addDept(); 
      break;

      case "View all Departments":
      viewAllDept();
      break;

      case "Add Roles": 
      addRole(); 
      break;

      case "View all Roles": 
      viewAllRoles(); 
      break;
    
      case "Update Employee Role":
      updateEmployeeRole(); 
      break;

      case "Exit":
      connection.end(); 
      break; 
      }
    })
  };

  function addEmployee() {
    inquirer.prompt ([
      {
        type: "input",
        message: "What is employees first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is employees last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is employees role?",
        name: "role",
      },
      {
        type: "input",
        message: "Who is employees manager?",
        name: "manager_id",
      },

    ]).then (function(res){
      const employeeSet = connection.employeeSet(
        "INSERT INTO employees SET ?", res,
        function(err, res) {
          if (err) throw err;
          console.log("Added employee!");

          runProgram();
        })
    });
  }

  function viewAllEmployees() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",
     function(err, res) {
      if (err) throw err;
      console.table(res);

      runProgram();
     });
  }



// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });


runProgram();