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

class Database {
    viewAllEmployees() {
        return con.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS DEPARTMENT, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
            // ALTER TABLE employee DROP INDEX (index)
        );
    };
    // viewAllEmployeesByDepartment() {
    //     return con.promise().query(
    //         "SELECT employee.first_name, employee.last_name, department.name AS DEPARTMENT FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.name;"
    //     );
    // };
    // viewAllEmployeesByManager() {
    //     return con.promise().query(
    //         "SELECT CONCAT(employee.first_name, ' ', 'employee.last_name') AS EMPLOYEE, role.title as ROLE, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee JOIN role ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id IS NOT NULL ORDER BY manager;"
    //     );
    // };
    // viewDepartments() {
    //     return con.promise().query(
    //         "SELECT * AS DEPARTMENTS FROM department;"
    //     );
    // };
    // viewRoles() {
    //     return con.promise().query(
    //         "SELECT * AS ROLES FROM role;"
    //     );
    // };
    // viewManagers() {
    //     return con.promise().query(
    //         "SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE employee.manager_id IS NULL;"
    //     );
    // };
    // async addNewDepartment() {
    //     let answers = await prompt([
    //         {
    //             type: 'input',
    //             name: 'deptn',
    //             message: 'Please input the name of the department.'
    //         }
    //     ]);
    //     let newDepartment = await con.promise().query(
    //         "INSERT INTO department SET ?;",
    //         {
    //             name: answers.deptn
    //         }
    //     );
    //     return newDepartment;
    // };
    // deleteDepartment() {
    //     return con.promise().query(
    //         "DELETE FROM department WHERE department.id = ?",

    //     );
    // };
    // addRoles() {};
    // deleteRoles() {};
    // // async addEmployee() {
    // //     let answers = await prompt([
    // //         {
    // //             type: "input",
    // //             name: "fname",
    // //             message: "Please enter the employee's first name."
    // //         },
    // //         {
    // //             type: "input",
    // //             name: "lname",
    // //             message: "Please enter the employee's last name."
    // //         },
    // //         {
    // //             type: "list",
    // //             name: "roleid",
    // //             message: "Please select the role id.",
    // //             choices: [1, 2, 3, 4, 5]
    // //         },
    // //         {
    // //             type: "list",
    // //             name: "managerid",
    // //             message: "Please select empoyee's manager's id.",
    // //             choices: [1, 2, 3]
    // //         },
    // //     ]);
    // //     let newEmployee = await con.promise().query(
    // //         "INSERT INTO employee Set ?",
    // //         {
    // //             first_name: answers.fname,
    // //             last_name: answers.lname,
    // //             role_id: answers.roldid,
    // //             manager_id: answers.managerid
    // //         }
    // //     );
    // //     return newEmployee;
    // // };
    // updateEmployee() {};
    // deleteEmployee() {}
}

module.exports = Database;