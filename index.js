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

function runProgram() {
  inquirer.prompt([
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
  ]).then(function (res) {
    switch (res.options) {

      case "Add Employee":
        addEmployee();
        break;

      case "View all Employees":
        viewAllEmployees();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "View all Departments":
        viewAllDepartments();
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

      case "Remove Employee":
        removeEmployee();
        break;

      case "Exit":
        connection.end();
        break;
    }
  })
};

function addEmployee() {
  inquirer.prompt([
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

  ]).then(function (res) {
    const employeeSet = connection.employeeSet(
      "INSERT INTO employees SET ?", res,
      function (err, res) {
        if (err) throw err;
        console.log("Added employee!");

        runProgram();
      })
  });
}

function viewAllEmployees() {
  connection.query("SELECT employees.first_name, employees.last_name, roles.title AS \"role\", managers.first_name AS \"manager\" FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);

      runProgram();
    });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What department would you like to add?"
    }
  ]).then(function (res) {
    console.log(res);
    const query = connection.query(
      "INSERT INTO departments SET ?",
      {
        name: res.departmentName
      },
      function (err, res) {
        connection.query("SELECT * FROM departments", function (err, res) {
          console.table(res);

          runProgram();
        })
      })
  })
}

function viewAllDepartments() {
  connection.query("SELECT * FROM departments", function (err, res) {
    console.table(res);

    runProgram();
  })
}

function addRole() {
  let departments = [];
  connection.query("SELECT * FROM departments",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        res[i].first_name + " " + res[i].last_name
        departments.push({ name: res[i].name, value: res[i].id });
      }
      inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "What role would you like to add?"
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?"
        },
        {
          type: "list",
          name: "department",
          message: "What is the department for this role?",
          choices: [
            "Engeneering",
            "Finance",
            "Legal",
            "Sales",
            "Service"
          ]
        },
      ]).then(function (res) {
        console.log(res);
        const query = connection.query(
          "INSERT INTO roles SET?",
          {
            title: res.title,
            salary: res.salary,
            department_id: res.department
          },
          function (err, res) {
            if (err) throw err;

            runProgram();
          }
        )
      })
    })
}

function viewAllRoles(){
  connection.query("SELECT roles.*, department.name FROM roles LEFT JOIN department ON department.id = roles.department_id", function (err, res){
    if (err) throw err;
    console.table(res);

    runProgram();
  })
}


// db.query('SELECT * FROM students', function (err, results) {
//   console.log(results);
// });


runProgram();