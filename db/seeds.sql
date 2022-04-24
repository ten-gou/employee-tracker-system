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
    ("Recruiter", 35000, 6);

/*Employees Seed - 6 values to input*/
INSERT INTO employees (employee_first_name, employee_last_name, employee_job_id, employee_department_id, employee_salary, employee_managers)
VALUES
    ("Stanley", "Pines", 1, 6, 35000, "Barkins Perkins");