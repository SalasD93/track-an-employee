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


function initPrompt() {
    prompt([
        {
            type: "list",
            name: "employees",
            message: "Please use the arrow keys to select what you would like to do.",
            choices: 
            [
                "View All Employees", 
                "View All Employees By Department", 
                "View All Employees By Manager", 
                "View All Departments",
                "View All Roles",
                "View All Managers",
                "Add Employee",
                "More Employee Options",
                "Department Options",
                "Role Options",
                "Exit"
            ]
        },
        {
            type: "list",
            name: "employeeOpts",
            message: "Please select from the list of options.",
            choices: ["Remove Employee", "Update Employee Role", "Update Employee Manager",],
            when: (answers) => answers.employees === "More Employee Options"
        },
        {
            type: "list",
            name: "deptOpts",
            message: "Please select from the list of options.",
            choices: ["Add Department", "Remove Department"],
            when: (answers) => answers.employees === "Department Options"
        },
        {
            type: "list",
            name: "roleOpts",
            message: "Please select from the list of options.",
            choices: ["Add Role", "Update Role", "Remove Role",],
            when: (answers) => answers.employees === "Role Options"
        },
        // {
        //     type: "list",
        //     name: "title",
        //     message: "Please select the employee's role.",
        //     choices: ["manArr"],
        //     when: (answers) => answers.employees === "Add Employee"
        // },
        // {
        //     type: "input",
        //     name: "salary",
        //     message: "Please enter the employee's salary. (format: 100000)",
        //     when: ( answers ) => answers.employees === "Add Employee"
        // },
        // {
        //     type: "list",
        //     name: "name",
        //     message: "Please select the employee's department.",
        //     choices: ["customer service", "customer service1", "customer service2"],
        //     when: ( answers ) => answers.employees === "Add Employee"
        // }
    ])
    .then(( answers ) => {
        if (answers.employees === "Exit") {
            console.log(answers);
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
                case 'View All Departments':
                    break;
                case 'View All Roles':
                    break;
                case 'View All Managers':
                    break;
                case 'Add Employee':
                    // addEmployee(answers)
                    // return db.addEmployee().then(([rows]) => {
                    //     let employees = rows;
                    //     const employeesChoices = employees.map(({ first_name, last_name,  }) => ({
                    //       name: `${first_name} ${last_name}`,
                    //       value: id,
                    //     }));
                    //     console.log(managerChoices);
                    //   });
                    // return console.log('it worked');
                    break;
                case 'More Employee Options':
                    switch (answers.employeeOpts) {
                        case 'Update Employee Role':
                            return console.log("works");
                        }
                    break;
                case 'Department Options':
                    switch (answers.deptOpts) {
                        case 'Add Department':
                            return console.log("works");
                        case 'Remove Department':
                            break;
                    }
                    break;
                case 'Role Options':
                    switch (answers.roleOpts) {
                        case 'Add Role':
                            return console.log("works");
                        case 'Update Role':
                            break;
                        case 'Remove Role':
                            break;
                    }
                    break;
                    // case 'Update Employee Role':
                    // return console.log("works");
            }
            // if (answers.employees === "More Employee Options") {
            //     switch (answers.employeeOpts) {
            //         case 'Update Employee Role':
            //             return console.log("works");
            //         }
            // }
            // "View All Employees", 
            //     "View All Employees By Department", 
            //     "View All Employees By Manager", 
            //     "View All Departments",
            //     "View All Roles",
            //     "View All Managers",
            //     "Add Employee",
            //     "More Employee Options",
            //     "Department Options",
            //     "Role Options",
            //     "Exit"
            // This restarts the questions after each set is answered
            // return initPrompt();
            return initPrompt();
        }
        // if (answers.employeeOpts) {
        //     switch (answers.employeeOpts) {
        //         case 'Update Employee Role':
        //             return console.log("works");
        //             // this.teamMembers.push(new Intern(name, id, email, extra));
        //             // break;
        //         case 'Update Employee Manager':
        //             break;
        //         case 'Remove Employee':
        //             // this.teamMembers.push(new Intern(name, id, email, extra));
        //             break;
        //     }
        //     return initPrompt();
        // } else if (answers.deptOpts) {
        //     switch (answers.deptOpts) {
        //         case 'Add Department':
        //             return console.log("works");
        //         case 'Remove Department':
        //             break;
        //     }
        //     return initPrompt();
        // } else if (answers.roleOpts) {
        //     switch (answers.roleOpts) {
        //         case 'Add Role':
        //             return console.log("works");
        //         case 'Update Role':
        //             break;
        //         case 'Remove Role':
        //             break;
        //     }
        //     return initPrompt();
        // } else {
        //     return initPrompt();
        // }
    })
    // .then((answersC) => {return answersC})
    // .then(( answersC ) => {
    //     // if (answerss.employees === "Exit") {
    //     //     console.log(answers);
    //     //     return con.end();
    //     // } else {
    //         switch (answersC.employeeOpts) {
    //             case 'Update Employee Role':
    //                 return console.log("works");
    //                 // this.teamMembers.push(new Intern(name, id, email, extra));
    //                 // break;
    //             case 'Update Employee Manager':
    //                 break;
    //             case 'Remove Employee':
    //                 // this.teamMembers.push(new Intern(name, id, email, extra));
    //                 break;
    //         // }
    //         // return initPrompt();
    //     // } else if (answers.deptOpts) {
    //     //     switch (answers.deptOpts) {
    //     //         case 'Add Department':
    //     //             return console.log("works");
    //     //         case 'Remove Department':
    //     //             break;
    //     //     }
    //     //     return initPrompt();
    //     // } else if (answers.roleOpts) {
    //     //     switch (answers.roleOpts) {
    //     //         case 'Add Role':
    //     //             return console.log("works");
    //     //         case 'Update Role':
    //     //             break;
    //     //         case 'Remove Role':
    //     //             break;
    //     //     }
    //     //     return initPrompt();
    //     // } else {
    //     //     return initPrompt();
    //     }
    // })
    .catch(err => {
        console.log(err);
    })
}
initPrompt();