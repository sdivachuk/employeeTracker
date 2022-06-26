INSERT INTO department (name)
VALUES ("Engeneering"),
       ("Finance"),
       ("Legal"),
       ("Sales"),
       ("Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 2),
       ("Account Manager", 160000, 2),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3),
       ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Human Resources", 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wright", 1, 2),
       ("Denise", "Mayers", 2, NULL),
       ("Olivia", "Harper", 5, NULL),
       ("Scott", "Hinton", 6, 3),
       ("Emilie", "Piper", 8, 6),
       ("Anita", "Whitfield", 7, NULL),
       ("Richard", "Potts", 3, NULL),
       ("Oliver", "Macias", 4, 7),
       ("Amanda", "Barnes", 4, 7),
       ("Jamal", "Terry", 8, 6),
       ("Jane", "Cullen", 9, NULL),
       ("Ben", "Swanson", 8, 6);