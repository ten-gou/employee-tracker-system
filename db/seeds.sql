/*Departments Seed - 1 value to input*/
INSERT INTO departments (department_name)
VALUES
    ("Human Resources"),
    ("Research and Development"),
    ("Public Relations"),
    ("Corporate"),
    ("Engineering"),
    ("Recruiting"),
    ("Marketing"),
    ("Design");

/*Roles Seed - 3 values to input*/
INSERT INTO ROLES (job_title, job_salary, department_id)
VALUES
    ("Recruiter", 35000, 6),
    ("Social Media Manager", 35000, 3);

/*Employees Seed - 6 values to input*/
INSERT INTO employees (employee_first_name, employee_last_name, employee_job_id, employee_department_id, employee_salary, employee_manager)
VALUES
    ("Stanley", "Pines", 1, 6, 35000, 1),
    ("Martha", "Lily", 2, 3, 40000, 1);