import * as db from "../data/database.js";

export const getAllEmployees = (req, res) => {
  res.status(200).json(db.getAllEmployees());
};

export const getEmployeeById = (req, res) => {
  const id = +req.params.id;
  const employee = db.getEmployeeById(id);

  if (!employee) {
    return res.status(404).json({ message: `Employee not found.` });
  }

  res.status(200).json(employee);
};

export const saveEmployee = (req, res) => {
  let {
    company,
    lastname,
    firstname,
    position,
    salary,
    department,
    gender,
    holiday_days,
    birth_date,
  } = req.body;

  if (
    !company ||
    !lastname ||
    !firstname ||
    !position ||
    !salary ||
    !department ||
    !gender ||
    !holiday_days ||
    !birth_date
  ) {
    return res.status(400).json({ message: "Every field is required." });
  }

  company = company.trim();
  lastname = lastname.trim();
  firstname = firstname.trim();
  position = position.trim();
  department = department.trim();
  gender = gender.trim();
  birth_date = birth_date.trim();

  if (salary <= 0) {
    return res.status(400).json({ message: "Salary must be greater than 0." });
  }

  if (holiday_days < 0) {
    return res
      .status(400)
      .json({ message: "Holiday days cannot be negative." });
  }

  const specialChars = /[^A-Za-z0-9]/;
  if (specialChars.test(firstname) || specialChars.test(lastname)) {
    return res.status(400).json({ message: "Invalid name." });
  }

  if (holiday_days < 0) {
    return res
      .status(400)
      .json({ message: "Holiday days cannot be negative." });
  }

  if (!["male", "female"].includes(gender.toLowerCase())) {
    return res.status(400).json({ message: "Invalid gender" });
  }

  if (isNaN(Date.parse(birth_date)) || Date.now() < Date.parse(birth_date)) {
    return res
      .status(400)
      .json({ message: "Birth date must be a valid date." });
  }

  const saved = db.saveEmployee(
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
  res.status(201).json(db.getEmployeeById(saved.lastInsertRowid));
};

export const deleteEmployee = (req, res) => {
  const id = +req.params.id;
  if (!db.getEmployeeById(id)) {
    return res.status(404).json({ message: "Employee not found." });
  }
  db.deleteEmployee(id);
  res.status(204).json({ message: "Delete successful." });
};

export const updateEmployee = (req, res) => {
  let {
    company,
    lastname,
    firstname,
    position,
    salary,
    department,
    gender,
    holiday_days,
    birth_date,
  } = req.body;

  if (
    !company ||
    !lastname ||
    !firstname ||
    !position ||
    !salary ||
    !department ||
    !gender ||
    !holiday_days ||
    !birth_date
  ) {
    return res.status(400).json({ message: "Every field is required." });
  }

  company = company.trim();
  lastname = lastname.trim();
  firstname = firstname.trim();
  position = position.trim();
  department = department.trim();
  gender = gender.trim();
  birth_date = birth_date.trim();

  if (salary <= 0) {
    return res.status(400).json({ message: "Salary must be greater than 0." });
  }

  if (holiday_days < 0) {
    return res
      .status(400)
      .json({ message: "Holiday days cannot be negative." });
  }

  const specialChars = /[^A-Za-z0-9]/;
  if (specialChars.test(firstname) || specialChars.test(lastname)) {
    return res.status(400).json({ message: "Invalid name." });
  }

  if (holiday_days < 0) {
    return res
      .status(400)
      .json({ message: "Holiday days cannot be negative." });
  }

  if (!["male", "female"].includes(gender.toLowerCase())) {
    return res.status(400).json({ message: "Invalid gender" });
  }

  if (isNaN(Date.parse(birth_date)) || Date.now() < Date.parse(birth_date)) {
    return res
      .status(400)
      .json({ message: "Birth date must be a valid date." });
  }

  const id = +req.params.id;
  if (!db.getEmployeeById(id)) {
    return res.status(404).json({ message: "Employee not found." });
  }

  db.updateEmployee(
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
  );
  res.status(201).json(db.getEmployeeById(id));
};

export const getEmployeesByCompany = (req, res) => {
  const company = req.params.company;
  const employees = db.getEmployeesByCompany(company);

  if (employees.length == 0) {
    return res.status(404).json({ message: "Employees not found." });
  }
  res.status(200).json(employees);
};

export const getEmployeesByDepartment = (req, res) => {
  const department = req.params.department;

  const departments = db.getEmployeesByDepartment(department);
  console.log(departments);
  if (departments.length == 0) {
    return res.status(404).json({ message: "Departments not found." });
  }
  res.status(200).json(departments);
};

export const getStatistics = (req, res) => {
  res.status(200).json(db.getStatistics());
};
