USE employees;

INSERT INTO department (name)
VALUES
    ('Information Technology'),
    ('Front-end Maintenance'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 200000, 1),
    ('Manager', 150000, 2),
    ('Manager', 175000, 3),
    ('Senior Developer', 100000, 1),
    ('Senior Developer', 90000, 1),
    ('Junior Developer', 70000, 2),
    ('Junior Developer', 65000, 2),
    ('Customer Support', 40000, 3),
    ('Customer Support', 35000, 3),
    ('Intern', 0, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES   
    ('Yoda', 'Minch', 1, null),
    ('Amidala', 'Padme', 1, null),
    ('Kenobi', 'Obi', 1, null),
    ('Organa', 'Leia', 2, 1),
    ('Skywalker', 'Anakin', 2, 1),
    ('Skywalker', 'Luke', 3, 2),
    ('Ren', 'Kylo', 3, 2),
    ('Calrissian', 'Lando', 4, 3),
    ('Binks', 'Jar Jar', 4, 3),
    ('Solo', 'Han', 5, 2);