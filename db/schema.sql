DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30) NOT NULL,
    job_salary DECIMAL NOT NULL,
    department_id INTEGER,

    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    employee_first_name VARCHAR(30) NOT NULL,
    employee_last_name VARCHAR(30),
    employee_job_id INTEGER,
    employee_department_id INTEGER,
    employee_salary DECIMAL,
    employee_manager INTEGER,

    CONSTRAINT fk_employee_department FOREIGN KEY (employee_department_id) REFERENCES departments(id) ON DELETE SET NULL,
    CONSTRAINT fk_employee_job FOREIGN KEY (employee_job_id) REFERENCES roles(id) ON DELETE SET NULL
);