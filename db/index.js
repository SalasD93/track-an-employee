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
const { answers } = require('../app');
const  mysql = require('mysql2');

class Database {
    constructor () {
        this.connection = con;
    }
    viewAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    };
    viewAllEmployeesByDepartment() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id ORDER BY department.name;"
        );
    };
    viewAllEmployeesByManager() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id ORDER BY manager;"
        );
    };
    addEmployee() {

        return this.connection.promise().query(
            `INSERT INTO department (name);
            VALUE (${this.name});
            INSERT INTO role (title, salary, department_id);
            VALUE (${this.title}, ${this.salary}, ${this.departmentid});
            INSERT INTO employee (first_name, last_name, role_id, manager_id);
            VALUE (${this.fname}, ${this.lname}, ${this.roleid}, ${this.managerid});`
        );
        // .then((answers) => {return console.log(answers)})
        // .then(
        //     "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        // )
    }
}

module.exports = Database;