const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");

const render = require("./lib/htmlRenderer.js");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];
const idArray = [];

// Prompt for manager creation
function appMenu() {
    function createManager() {
        console.log("Assemble your team");
        inquirer.prompt([
            {
                type: "input",
                name: "mangName",
                message: "Who is the manger?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "You must enter at least one character.";
                }
            },
            {
                type: "input",
                name: "mangId",
                message: "Give the manager's ID number.",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "You must enter a positive number that is greater than zero for the ID number.";
                }
            },
            {
                type: "input",
                name: "mangEmail",
                message: "Give the manager's email.",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return;
                    }
                    return "Enter a VALID email address for this manager."
                }
            },
            {
                type: "input",
                name: "mangOff",
                message: "Give the manager's office number.",
                validate: answer => {
                    const pass = answer.match(
                        /^[-9]\d&$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "You must enter a positive number that is greater than zero for the office number."
                }
            }
            //Engineer Prompt
        ]).then(answers => {
            const manager = new Manager(answers.mangName, answers.mangId, answers.mangEmail, answers.mangOff);
            teamMembers.push(manager);
            idArray.push(answers.mangId);
            createTeam();
        });
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberSelect",
                message: "What role would you like to give the new team member?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No longer adding."
                ]
            }
        ]).then(userSelect => {
            switch(userSelect.memberSelect) {
                case "Engineer":
                    addEngineer();
                    break;
                    case "Intern":
                        addIntern();
                        break;
                        default:
                            buildTeam();
            }
        });
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engiName",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "You must enter at least one character for the engineer's name.";
                }
            },
            {
                type: "input",
                name: "engiId",
                message: "Give the engineer's ID number.",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is occupied. Enter a different number.";
                        } else {
                            return true;
                        }
                    }
                    return "You must enter a positive number greater than zero for the engineer ID.";
                }
            },
            {
                type: "input",
                name: "engiEmail",
                message: "Give the engineer's email address.",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "You must enter a VALID email address for this engineer.";
                }
            },
            {
                type: "input",
                name: "engiGithub",
                message: "Enter your engineer's GitHub username",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "You must enter at least one character for the engineer's GitHub username.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engiName, answers.engiId, answers.engiEmail, answers.engiGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engiId);
            createTeam();
        });
    }
    // Intern prompt
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "intName",
                message: "Give the intern's name.",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "You must enter at least one character for the intern's name.";
                }
            },
            {
                type: "input",
                name: "intId",
                message: "Give this intern an ID number.",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID number is occupied. Enter a different number.";
                        } else {
                            return true;
                        }

                    }
                    return "Enter a positive number that is greater than zero.";
                }
            },
            {
                type: "input",
                name: "intEmail",
                message: "Enter the intern's email.",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Enter a VALID email address for this intern."
                }
            },
            {
                type: "input",
                name: "intSchool",
                message: "Give the intern's school name.",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "You must enter at least one character.";
                }
            }
        ])
    }
}

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
