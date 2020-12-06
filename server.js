const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
// const questions = require ("./questions");
// const viewFunction = require("./viewFunction");



const connection = mysql.createConnection({
    host: "localhost",
    port: 3030,
    user: "root",
    password: "$@m$0n70lbs",
    database: "management_seed_db"
});
connection.connect();
connection.query = util.promisify(connection.query);




// NAME, SALARY, DEPARTMENT ID


const actionType = [{
  type: 'list',
  name: 'actionSelect',
  message: 'What action will you perform?',
  choices: ["View", "Add", "Update", "Quit"],
}];
     
const addType = [{
  type: 'list',
  name: 'addSelect',
  message: 'What would you like to add?',
  choices: ["Employee", "Role", "Department", "Quit"],
}];

const viewType = [{
  type: 'list',
  name: 'viewSelect',
  message: 'What would you like to view?',
  choices: ["Employee", "Role", "Department", "Quit"],
}];

const newDepartment = [{
  type: 'input',
  name: 'departmentTitle',
  message: 'Name this department.'  
}];
       



function viewQuestions() {
  inquirer.prompt(viewType).then(function (response) {
      let choice = response.viewChoice[0];
      console.log(choice);
      if (choice === "Department") {
          viewDepartment()
      };
      if (choice === "Role") {
          viewRole()
      };
      if (choice === "Employee") {
          viewEmployee()
      };
  })
};

function updateQuestions() {
  let roles = await connection.query("SELECT * FROM role");
  let employees = await connection.query("SELECT * FROM employee");
  let department = await connection.query("SELECT * FROM department");
  const updateType = [{
      type: "list",
      message: "Select the employee you wish to update",
      choices: employees.map(function (employee) {
          return {
              name: employee.last_name,
              value: employee.id
          };
      }),
      name: "updateEmplo"
  },
  {
      type: "list",
      message: "Select the role to apply to the employee.",
      choices: roles.map(function (role) {
          return {
              name: role.name,
              value: role.id
          };
      }),
      name: "updateRole"
  },
  {
    type: "list",
    message: "Select the department you would like to give the selected employee",
    choices: department.map(function (department) {
      return {
        name: department.name,
        value: department.id
      }
    }),
    name: "updateDept"
  }
]};


inquirer.prompt(updateType).then(function (response){
  let updateEmplo = response.updateEmp;
  let updateRole = response.updateRole;
  let updateDept = response.updateDept;
  console.log(updateEmplo);
  console.log(updateRole);
  console.log(updateDept);
  coneection.query("UPDATE employee SET role_id = ? WHERE id = ?", [[updateRole], [updateEmplo], [updateDept]], function (err, res) {
    if (err) throw err;
    console.log(`role was added`)
    menuPrompts()
  })
  })

//Viewing Functions
async function viewRole() {
  let roles = await connection.query("SELECT * FROM role")
  console.table(roles);
  menuPrompts();

};

function viewEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      menuPrompts();
  })
};

function viewDepartment() {
  connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
      menuPrompts();
  })
};

//Adding Functions
async function addRole() {
  // let employee
  let department = await connection.query("SELECT * FROM department");
  const newRole = [{
    type: "input",
    message: "Name the new role.",
    name: "roleName"
  },
  {type: "input",}
  ]
}