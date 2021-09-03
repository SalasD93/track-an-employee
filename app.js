const con = require('./config/connection');
const Database = require('./db/index');
const { prompt } = require('inquirer');
const db = new Database();
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


// what would you like to do
// options: view all employees, add department, add role, add employee, update employee role
    // show table????
    // add department
        // new Department()
    // add role
        // new Role()
    // add employee
    // pass over answers as arguments into
        // db.addEmployee
    // update employee role
        // ????

        // db.addRole()
        // connection.query()

        // select name as manager where manager id =??



// This is the class that holds the queries for the database


function questionPrompt() {
    prompt([
            {
                type: "list",
                name: "employees",
                message: "Would you like to add a team manager, engineer, or intern?",
                choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
            },            
            {
                type: "input",
                name: "fname",
                message: "Please enter the employee's first name.",
                when: (answers) => answers.employees === "Add Employee"
            },
            {
                type: "input",
                name: "lname",
                message: "Please enter the employee's last name.",
                when: (answers) => answers.employees === "Add Employee"
            },
            {
                type: "list",
                name: "roleid",
                message: "Please enter the role id.",
                choices: [1, 2, 3, 4, 5],
                when: (answers) => answers.employees === "Add Employee"
            },
            {
                type: "list",
                name: "managerid",
                message: "Please select empoyee's manager id.",
                choices: [1, 2, 3],
                when: (answers) => answers.employees === "Add Employee"
            },
            {
                type: "list",
                name: "title",
                message: "Please select the employee's role.",
                choices: ["Manager", "Senior Developer", "Junior Developer", "Customer Support", "Intern"],
                when: (answers) => answers.employees === "Add Employee"
            },
            {
                type: "input",
                name: "salary",
                message: "Please enter the employee's salary. (format: 100000)",
                when: ( answers ) => answers.employees === "Add Employee"
            },
            {
                type: "list",
                name: "name",
                message: "Please select the employee's department.",
                choices: ["customer service", "customer service1", "customer service2"],
                when: ( answers ) => answers.employees === "Add Employee"
            }
    ])
        .then(( answers ) => {
            if (answers.employees === "Exit") {
                console.log(answers);
                // This function creates the HTML with the constructor info when all the questions are answered
                // memberCards(this.teamMembers);
                return con.end();
            } else {
                // ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
                // This lets the different answers for each member to be displayed accordingly
                switch (answers.employees) {
                    case 'View All Employees':
                        // this.teamMembers.push(new Manager(name, id, email, extra));
                        break;
                    case 'View All Employees By Department':
                        // this.teamMembers.push(new Engineer(name, id, email, extra));
                        break;
                    case 'View All Employees By Manager':
                        // this.teamMembers.push(new Intern(name, id, email, extra));
                        break;
                    case 'Add Employee':
                        // addEmployee(answers)
                        return db.addEmployee(answers);
                        // return console.log('it worked');
                    case 'Remove Employee':
                        // this.teamMembers.push(new Intern(name, id, email, extra));
                        break;
                    case 'Update Employee Role':
                        // this.teamMembers.push(new Intern(name, id, email, extra));
                        break;
                    case 'Update Employee Manager':
                        break;
                }
                // This restarts the questions after each set is answered
                return questionPrompt();
            }
        })    
        .catch(err => {
            console.log(err);
        })
}
questionPrompt();