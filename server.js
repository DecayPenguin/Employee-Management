const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");

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
       



function addQuestions() {
  inquirer.prompt(addType).then(function (response) {
      let choice = response.addChoice[0];
      console.log(choice);
      if (choice === "Department") {
          addDepartment();
      };
      if (choice === "Role") {
          addRole();
      };
      if (choice === "Employee") {
          addEmployee();
      };
  })
};

function viewQuestions() {
  inquirer.prompt(addType).then(function (response) {
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

async function updateQuestions() {
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
  let updateEmplo = response.updateEmplo;
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
// async function addRole() {
//   // let employee
//   let department = await connection.query("SELECT * FROM department");
//   const newRole = [{
//     type: "input",
//     message: "Name the new role.",
//     name: "roleName"
//   },
//   {
//     type: "input",
//     message: "Input the role's salary(Only numbers are accepted, no decimals or commas)",
//     name: "salary"
//   },
//   {
//     type: "list",
//     message: "Assign a department to this role",
//     choices: department.map(function(department) {
//       return {
//         name: department.name,
//         value: department.id
//       };
//     }),
//     name: "roleDepartment"
//   },
//   {

//   }
//   ]  
// }

async function addRole() {
  let department = await connection.query("SELECT * FROM department");
  const newRole = [{
      type: "input",
      message: "Name the new role.",
      name: "roleName"
  },
  {
      type: "input",
      message: "Input the role's salary(Only numbers are accepted, no decimals or commas)",
      name: "salary"
  },
  {
      type: "list",
      message: "Assign a department to this role",
      choices: department.map(function(department) {
          return {
              name: department.name,
              value: department.id
          };
      }),
      name: "roleDepartment"
  }]
}

// async function addEmployee() {
//   let roles = await connection.query("SELECT * FROM role");
//   let manager = await connection.query("SELECT * FROM employee WHERE manager_id is null");
//   console.table(manager);
//   console.log(roles);
//   const newEmployee = [{
//     type: "input",
//     message: "Supply the employee's first name.",
//     name: "firstName"
//     },
//     {
//     type: "input",
//     message: "Supply the employee's last name.",
//     name: lastName
//     },
//     {
//       type: "list",
//       message: "Select the employee's role",
//       choices: roles.map(function (role) {
//         name: role.name;
//         value: role.id
//       };
//     }),
//     name: "hasManager"
//   }
// ];

async function addEmployee() {
  let roles = await connection.query("SELECT * FROM role");
  let manager = await connection.query("SELECT * FROM employee WHERE manager_id is null");
  console.table(manager);

  console.log(roles);
  const newEmployee = [{
      type: "input",
      message: "Supply the employee's first name.",
      name: "firstName",
  },
  {
      type: "Input",
      message: "Supply the employee's last name.",
      name: "lastName"
  },
  {
      type: "checkbox",
      message: "Select the employee's role",
      choices: roles.map(function (role) {
          return {
              name: role.name,
              value: role.id
          };
      }),
      name: "roleName"
  },
  {
      type: "list",
      message: "Who is the employees manager?",
      choices: manager.map(function (employee) {
          return {
              name: employee.last_name,
              value: employee.id
          };
      }),
      name: "hasManager"
  }
]}

inquirer.prompt(newEmployee).then(function (response) {
  let departmentName = response.departmentName
  connection.query("INSERT INTO department(name) VALUES (?)", [[departmentName]], function (err, res) {
    if (err) throw err;
    console.log(`$departmentName was added`)
    menuPrompts()
  })
})

function menuPrompts() {
  inquirer.prompt(action(Type).then(function(response) {
    let choice = response.actionChoice[0];
    console.log(choice);
    if(choice === "view") {
      console.log("view");
      viewQuestions();
    }
    if (choice === "add") {
      console.log("add");
      addQuestions();
    }
  }))
}

// Menu activation
function menuPrompts() {
  inquirer.prompt(actionType).then(function(response) {
    let choice = response.actionChoice[0];
    console.log(choice);
    if(choice === "add") {
      console.log("add");
      addQuestions();
    }
    if (choice == "view") {
      console.log("update");
      updateQuestions();
    }
    else {
      console.log("Bye for now!");
    }
  })}

