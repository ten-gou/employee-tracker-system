DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    department_name VARCHAR(50) NOT NULL,
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
)

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    job_id INTEGER NOT NULL,
    job_salary INTEGER NOT NULL
    department_id INTEGER,

    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
)

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    employee_first_name VARCHAR(50) NOT NULL,
    employee_last_name VARCHAR(50),
    employee_job_title INTEGER,
    department_id INTEGER,
    employee_salary INTEGER,
    employee_managers VARCHAR(100),

    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    CONSTRAINT fk_employee_job FOREIGN KEY (employee_job_title) REFERENCES roles(id) ON DELETE SET NULL,
)