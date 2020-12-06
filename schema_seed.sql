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

-- Role ID
INSERT INTO department (name)
VALUES
("Manufacturing"),
("Business"),
("Legal");

-- Department ID
INSERT INTO role(name, salary, department_id)
VALUES(Engineer, 66100, 1)
(Marketer, 44000, 2)
(Lawyer, 74000, 3)

-- INSERT INTO department

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Evan", "Hansen", 1, null),
("Jason", "Dean", 2, 1),
("Alex", "Rider", 2, 1),
("Rich", "Goranski", 2, null),
("Jeremy", "Heere", 2, 4),
("Michael", "Mell", 2, 4),
("Nicholas", "Bourbaki", 2, 4)
("Veronica", "Sawyer", 3, null),
("Lydia", "Deetz", 3, 8)
("Delia", "Deetz", 3, 8)
("Chirstine", "Canigula", 3, 8)