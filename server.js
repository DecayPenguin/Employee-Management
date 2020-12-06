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

function viewQuestions() {
  let roles = await connection.query("SELECT * FROM role");
  let employees = await connection.query("SELECT * FROM employee");
  const updateType = [{
      type: "list",
      message: "Select the employee you wish to update",
      choices: employees.map(function (employee) {
          return {
              name: employee.last_name,
              value: employee.id
          };
      }),
      name: "updateEmployee"
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
      name: "newRole"
  }
]};

function addQuestions() {
  inquirer.prompt(viewType).then(function (response) {
    let choice = response.viewChoice[0];
    console.log(choice);
    if (choice === "Department") {
      viewDepartment()
    };
    if(choice === "Role") {
      viewRole()
    };
    if (choice === "Employee") {
      viewEmployee()
    };
  })
}

async function updateQuestions() {
  let roles = await connection.query("SELECT * FROM employee");
  let employees = await connection.query("SELECT * FROM employee")
  const updateType = [{
    type: "list"
  }]
}