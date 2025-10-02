import express from "express";
import employees from "#db/employees";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  const employee = employees[randomIndex];
  res.json(employee);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.json(employee);
});

router.post("/", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is required");
  }

  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Name is required");
  }

  const newId = Math.max(...employees.map((e) => e.id)) + 1;
  const newEmployee = { id: newId, name };
  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});

export default router;
