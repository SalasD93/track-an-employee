// Required dependecies/modules
const { prompt } = require('inquirer');
const chalkAnimation = require('chalk-animation');
const con = require('./config/connection');
const Database = require('./db/index');
const db = new Database();

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
            choices: ["Add Role", "Remove Role",],
            when: (answers) => answers.employees === "Role Options"
        },
    ])
    .then((answers) => {
        // These arrays store table data objects once table information is called
        let deptArr = [];
        let rolArr = [];
        let manArr = [];
        let empArr = [];
        // These add table information to related arrays
        db.viewDepartments()
        .then(([rows]) => {
            let dept = rows;
            const depts = dept.map(({ id, name }) => 
            ({
                name: name,
                value: id
            }));
            deptArr = depts;
        });

        db.viewRoles()
        .then(([rows]) => {
            let role = rows;
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
            // This tells the program to stop running
            if (answers.employees === "Exit") {
                return con.end();
            } else {
                // This iterates through all the choices submitted in prompt / calls the associated methods
                switch (answers.employees) {
                    case 'View All Employees':
                        // Can use return instead of break for cases
                        return db.viewAllEmployees()
                        // The [rows] takes in the information from the rows that were called in the related method
                        .then(([rows]) => {
                            // console.table shows a table of the rendered rows
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
                        // Pass in arrays for method to use in class in db/index.js
                        return db.addEmployee(rolArr, manArr).then(([res]) => {
                            console.log('Successfully added employee!');
                            initPrompt();
                        });
                    case 'More Employee Options':
                        // Can add a switch statement in a switch statment to keep information grouped together preventing promise issues
                        switch (answers.employeeOpts) {
                            case 'Remove Employee':
                                return db.deleteEmployee(empArr).then((res) => {
                                    console.log("Successfully removed employee!");
                                    initPrompt();
                                });
                            case 'Update Employee Role':
                                return db.updateEmployeeRole(rolArr, empArr).then((res) => {
                                    console.log("Successfully updated employee's role!");
                                    initPrompt();
                                });
                            case 'Update Employee Manager':
                                return db.updateEmployeeMan(empArr, manArr,).then((res) => {
                                    console.log("Successfully updated employee's manager!");
                                    initPrompt();
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
                                return db.deleteRoles(deptArr).then((res) => {
                                    console.log('Successfully deleted department!');
                                    initPrompt();
                                });
                        }
                    break;
                    case 'Role Options':
                        switch (answers.roleOpts) {
                            case 'Add Role':
                                return db.addRoles(rolArr).then((res) => {
                                    console.log('Successfully added role!');
                                    initPrompt();
                                });
                            case 'Remove Role':
                                return db.deleteRoles(rolArr).then((res) => {
                                    console.log('Successfully deleted role!');
                                    initPrompt();
                                });
                        }
                    break;
                };
            };
        });
    })
    .catch(err => {
        console.log(err);
    });
};
initPrompt();