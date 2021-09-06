// create new class for all db stuff
// export db
// import connection with require
// set up queries inside class
    // findAll() uses connection to find query
    // write out select in `` link in terminal connection.query(``)
// db.add employee
// write query to insert into
// view all roles, add role, remove role
const con  = require('../config/connection');
const { prompt } = require('inquirer');
// This is the class that holds the queries for the database
class Database {
    viewAllEmployees() {
        return con.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS DEPARTMENT, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
            // ALTER TABLE employee DROP INDEX (index)
        );
    };
    viewAllEmployeesByDepartment() {
        return con.promise().query(
            "SELECT employee.first_name, employee.last_name, department.name AS DEPARTMENT FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.name;"
        );
    };
    viewAllEmployeesByManager() {
        return con.promise().query(
            "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS EMPLOYEE, role.title as ROLE, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee JOIN role ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id IS NOT NULL ORDER BY manager;"
        );
    };
    viewDepartments() {
        return con.promise().query(
            "SELECT department.name AS DEPARTMENTS, department.id FROM department;"
        );
    };
    viewRoles() {
        return con.promise().query(
            "SELECT * FROM role;"
        );
    };
    viewManagers() {
        return con.promise().query(
            "SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE employee.manager_id IS NULL;"
        );
    };
    async addNewDepartment() {
        let answers = await prompt([
            {
                type: 'input',
                name: 'deptn',
                message: 'Please input the name of the department.'
            }
        ]);
        let newDepartment = await con.promise().query(
            "INSERT INTO department SET ?;",
            {
                name: answers.deptn
            }
        );
        return newDepartment;
    };
    // deleteDepartment() {
    //     return con.promise().query(
    //         "DELETE FROM department WHERE department.id = ?",

    //     );
    // };
    async addRoles(rolArr) {
        let answers = await prompt([
            {
                type: "input",
                name: "title",
                message: "Please enter the name of the role you would like to add."
            },
            {
                type: "input",
                name: "salary",
                message: "Please input salary. (format: 40000)"
            },
            {
                type: "input",
                name: "deptID",
                message: "Please input department ID."
            }
        ]);
        let newRole = con.promise().query(
            "INSERT INTO role SET ?",
            {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.deptID
            }
        );
        return newRole;
    };
    async deleteRoles(rolArr) {
        let answers = await prompt([
            {
                type: "list",
                name: "roleD",
                choices: rolArr
            }
        ]);
        let delRole = await con.promise().query(
            "DELETE FROM role WHERE `id` = ?", [answers.roleD]
        );
        return delRole;
    };
    async addEmployee(rolArr, manArr) {
        let answers = await prompt([
            {
                type: "input",
                name: "fname",
                message: "Please enter the employee's first name."
            },
            {
                type: "input",
                name: "lname",
                message: "Please enter the employee's last name."
            },
            {
                type: "list",
                name: "roleid",
                message: "Please select the employee's role id.",
                choices: rolArr
            },
            {
                type: "list",
                name: "managerid",
                message: "Please select employee's manager.",
                choices: manArr
            },
        ]);
        let newEmployee = await con.promise().query(
            "INSERT INTO employee Set ?",
            {
                first_name: answers.fname,
                last_name: answers.lname,
                role_id: answers.roleid,
                manager_id: answers.managerid
            }
        );
        return newEmployee;
    };
    async updateEmployeeRole(rolArr, empArr) {
        let answers = await prompt([
            {
                type: "list",
                name: "updEmp",
                message: "Please select an employee.",
                choices: empArr
            },
            {
                type: "list",
                name: "updEmpRol",
                message: "Please select the employee's role.",
                choices: rolArr,
            },
        ]);
        let updateEmp = await con.promise().query
            (
                "UPDATE employee SET `role_id` = ? WHERE `id` = ?", [answers.updEmpRol, answers.updateEmp]
            );
        return updateEmp;
    };
    async updateEmployeeMan(empArr, manArr) {
        let answers = await prompt([
            {
                type: "list",
                name: "updEmp",
                message: "Please select an employee.",
                choices: empArr
            },
            {
                type: "list",
                name: "empMan",
                message: "Please select the employee's manager",
                choices: manArr,
                // when: (answers) => answers.confUpdMan
            }
        ]);
        let updMan = await con.promise().query
            (
                "UPDATE employee SET `manager_id` = ? WHERE `id` = ?", [answers.empMan, answers.updEmp]
            );
        return updMan;
    };
    async deleteEmployee(empArr) {
        let answers = await prompt([
            {
                type: "list",
                name: "delEmp",
                message: "Please choose the employee you want to remove.",
                choices: empArr
            },
        ]);
        let deleteEmployee = await con.promise().query(
            "DELETE FROM employee WHERE `id` = ?", [answers.delEmp]
        );
        return deleteEmployee;
    };
}

module.exports = Database;