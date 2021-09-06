USE employees;

INSERT INTO department (name)
VALUES
    ('Information Technology'),
    ('Front-end Maintenance'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager1', 200000, 1),
    ('Manager2', 150000, 2),
    ('Manager3', 175000, 3),
    ('Senior Developer1', 100000, 1),
    ('Senior Developer2', 90000, 1),
    ('Junior Developer1', 70000, 2),
    ('Junior Developer2', 65000, 2),
    ('Customer Support1', 40000, 3),
    ('Customer Support2', 35000, 3),
    ('Intern', 0, 2);

INSERT INTO employee (last_name, first_name, role_id, manager_id)
VALUES   
    ('Yoda', 'Minch', 1, null),
    ('Amidala', 'Padme', 2, null),
    ('Kenobi', 'Obi', 3, null),
    ('Organa', 'Leia', 4, 1),
    ('Skywalker', 'Anakin', 5, 1),
    ('Skywalker', 'Luke', 6, 2),
    ('Ren', 'Kylo', 7, 2),
    ('Calrissian', 'Lando', 8, 3),
    ('Binks', 'Jar Jar', 9, 3),
    ('Solo', 'Han', 10, 2);