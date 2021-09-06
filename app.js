const { prompt } = require('inquirer');
const chalkAnimation = require('chalk-animation');
const con = require('./config/connection');
const Database = require('./db/index');
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

// This function uses the Database class methods to produce tables based off user input
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
        // These create subcategories to reduce scrolling in prompt
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
    .then((answers) => {
        let deptArr = [];
        let rolArr = [];
        let manArr = [];
        let empArr = [];
        db.viewDepartments()
        .then(([rows]) => {
            let dept = rows;
            console.log(dept);
            const depts = dept.map(({ id, name }) => 
            ({
                name: name,
                value: id
            }));
            deptArr = depts;
            // console.log(deptArr);
        });
        db.viewRoles()
        .then(([rows]) => {
            let role = rows;
            console.log(role);
            const roles = role.map(({ id, title }) => 
            ({
                name: title,
                value: id
            }));
            rolArr = roles;
        });
        db.viewAllEmployees()
        .then(([rows]) => {
            let emp = rows;
            const emps = emp.map(({ id, first_name, last_name}) => 
            ({
                name: `${first_name} ${last_name}`,
                value: id,
            }));
            empArr = emps;
        });
        db.viewManagers()
        .then(([rows]) => {
            let man = rows;
            const mans = man.map(({ id, first_name, last_name }) =>
        ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        manArr = mans;
    })
        .then(() => {
            if (answers.employees === "Exit") {
                console.log(answers);
                return con.end();
            } else {
                switch (answers.employees) {
                    case 'View All Employees':
                        return db.viewAllEmployees()
                        .then(([rows]) => {
                            console.table(rows)
                            initPrompt();
                        });
                    case 'View All Employees By Department':
                        return db.viewAllEmployeesByDepartment()
                        .then(([rows]) => {
                            console.table(rows)
                            initPrompt();
                        });
                    case 'View All Employees By Manager':
                        return db.viewAllEmployeesByManager()
                        .then(([rows]) => {
                            console.table(rows)
                            initPrompt();
                        });
                    case 'View All Departments':
                        return db.viewDepartments()
                        .then(([rows]) => {
                            console.table(rows);
                            initPrompt();
                        });
                    case 'View All Roles':
                        return db.viewRoles()
                        .then(([rows]) => {
                            console.table(rows)
                            initPrompt();
                        });
                    case 'View All Managers':
                        return db.viewManagers()
                        .then(([rows]) => {
                            console.table(rows)
                            initPrompt();
                        });
                    case 'Add Employee':
                        return db.addEmployee(rolArr, manArr).then(([res]) => {
                            // let success = chalkAnimation.pulse('Successfully added employee!', 2);
                            // chalkAnimation.pulse('Successfully added employee!', 5);
                            console.log('Successfully added employee!');
                            initPrompt();
                        });
                    case 'More Employee Options':
                        switch (answers.employeeOpts) {
                            case 'Remove Employee':
                                console.log("works");
                                break;
                            case 'Update Employee Role':
                                return db.updateEmployeeRole(rolArr, empArr).then((res) => {
                                    console.log("Successfully updated employee's role!");
                                });
                            case 'Update Employee Manager':
                                return db.updateEmployeeMan(manArr, empArr).then((res) => {
                                    console.log("Successfully updated employee's role!");
                                });
                            }
                        break;
                    case 'Department Options':
                        switch (answers.deptOpts) {
                            case 'Add Department':
                            return db.addNewDepartment().then(([res]) => {
                                console.log('Successfully added department!');
                                initPrompt();
                            });
                            case 'Remove Department':
                                break;
                        }
                        break;
                    case 'Role Options':
                        switch (answers.roleOpts) {
                            case 'Add Role':
                                return db.addRoles(rolArr).then((res) => {
                                    console.log('Successfully added role!');
                                    initPrompt();
                                });
                            case 'Update Role':
                                break;
                            // case 'Remove Role':
                            //     return db.deleteRoles(rolArr).then((res) => {
                            //         console.log('Successfully deleted role!');
                            //         initPrompt();
                            //     });
                        }
                        break;
                        // case 'Update Employee Role':
                        // return console.log("works");
                };
                // initPrompt();
            };
        })
    })
    .catch(err => {
        console.log(err);
    })
}
initPrompt();