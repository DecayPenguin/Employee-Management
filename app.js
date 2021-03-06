const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./Develop/output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");
let employees = []

// function to initialize program
// this function asks for intern
function init() {
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Provide the name of the member',
        default: 'New member',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Provide the email of the member',
        default: 'newmember@gmail.com',
      },
      {
        type: 'input',
        name: 'id',
        message: 'Provide the ID number of the member',
      },
      {
        type: 'list',
        name: 'roles',
        message: 'Choose the role of this team member',
        choices: ["Intern", "Engineer", "Manager"]
        //, "Int", "Engi", "Manag"
      },


  
  
    ])
    .then(answers => {
      //console.info('Answers:', answers.roles); 
      //Adding in variables via Name:
      let id = answers.id
      let name = answers.name
      let email = answers.email
      if (answers.roles === "Intern") {
          inquirer
          .prompt([
            {
              type: 'input',
              name: 'school',
              message: 'Provide the name of the school member attended/attends',
            }
            ]).then(
                internAnswers => {
                    let school = internAnswers.school
                    let newIntern = new Intern(school, name, email, id, github)
                    console.log(newIntern)
                    employees.push(newIntern)
                console.log("emp", employees)
                }

            )
          
      }
      if (answers.roles === "Engineer") {
          inquirer
          .prompt([
              {
                  type: 'input',
                  name: 'github',
                  message: 'Provide the GitHub of the new member',
              }
          ]).then(
              engineerAnswers => {
                  let github = engineerAnswers.github
                  let newEngineer = new Engineer(name, email, id, github)
                  console.log(newEngineer)
                  employees.push(newEngineer)
            console.log("emp", employees)
              }
          )
      }
      if (answers.roles === "Manager") {
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'github',
                message: 'Provide the GitHub of the new member',
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Provide the office number of the manager',
            }
        ]).then(
            managerAnswers => {
                let github = managerAnswers.github
                let newManager= new Manager(name, email, id, github)
                console.log(newManager)
                employees.push(newManager)
          console.log("emp", employees)
            }
        )
    }

      
     
      
    });

    var formatAnswers = render(employees)
   
fs.writeFile(outputPath, formatAnswers, (err) => {
if (err) throw err;
console.log('The file has been saved!');
            });
}

init();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
