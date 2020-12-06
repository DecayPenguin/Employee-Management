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
  message: 'What action would you like to perform?',
  choices: ["Add", "View", "Update", "Quit"],
}];
     
const addType = [{
  type: 'list',
  name: 'addSelect',
  message: 'What would you like to add?',
  choices: ["employee", "role", "department", "quit"],
}];

const viewType = [{
  type: 'list',
  name: 'viewSelect',
  message: 'What would you like to view?',
  choices: ["employee", "role", "department", "quit"],
}];

const newDepartment = [{
  type: 'input',
  name: 'departmentName',
  message: 'Name this department.'  
}];
       
    .then(answers => {
      console.info('Answers:', answers);
      var formatAnswers = generateMarkdown(answers)
      fs.writeFile('README.md', formatAnswers, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      
    });
}

// function call to initialize program
init();
