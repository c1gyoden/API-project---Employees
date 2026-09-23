import Database from "better-sqlite3";
const db = new Database("./data/employees.db");

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    lastname TEXT,
    firstname TEXT,
    position TEXT,
    salary REAL,
    department TEXT,
    gender TEXT,
    holiday_days INTEGER,
    birth_date TEXT
    )`,
).run();

export const getAllEmployees = () =>
  db.prepare("SELECT * FROM employees").all();

export const getEmployeeById = (id) =>
  db.prepare("SELECT * FROM employees WHERE id = ?").get(id);

export const saveEmployee = (
  company,
  lastname,
  firstname,
  position,
  salary,
  department,
  gender,
  holiday_days,
  birth_date,
) =>
  db
    .prepare(
      "INSERT INTO employees (company, lastname, firstname, position, salary, department, gender, holiday_days, birth_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    )
    .run(
      company,
      lastname,
      firstname,
      position,
      salary,
      department,
      gender,
      holiday_days,
      birth_date,
    );

export const deleteEmployee = (id) =>
  db.prepare("DELETE FROM employees WHERE id = ?").run(id);

export const updateEmployee = (
  id,
  company,
  lastname,
  firstname,
  position,
  salary,
  department,
  gender,
  holiday_days,
  birth_date,
) =>
  db
    .prepare(
      "UPDATE employees SET company = ?, lastname = ?, firstname = ?, position = ?, salary = ?, department = ?, gender = ?, holiday_days = ?, birth_date = ? WHERE id = ?",
    )
    .run(
      company,
      lastname,
      firstname,
      position,
      salary,
      department,
      gender,
      holiday_days,
      birth_date,
      id,
    );

export const getEmployeesByCompany = (company) =>
  db.prepare("SELECT * FROM employees WHERE company = ?").all(company);

export const getEmployeesByDepartment = (department) =>
  db.prepare("SELECT * FROM employees WHERE department = ?").all(department);

export const getStatistics = () =>
  db
    .prepare(
      "SELECT COUNT(id) AS `employeeCount`, AVG(salary) AS `averageSalary`, MAX(salary) AS `highestSalary`, AVG(holiday_days) AS `averageHolidayDays` FROM employees",
    )
    .get();
