CREATE TABLE employee
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name


function addQuestions() {
    inquirer.prompt(addType).then(function (response) {
        let choice === response.addChoice[0];
        console.log(choice);
        if(choice == "employee"){
            addEmployee();
        }
        if(choice === view){
            addView();
        }
        if(choice === )
    })
}



INSERT INTO employee(first_name, last_name, rolde_id, )

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL,
    INDEX mngr_index(manager_id),

);

INSERT INTO department (name)
VALUES ("Legal"),
("Manufacturing"),
("Salesman");


