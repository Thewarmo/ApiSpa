const express = require("express");
const router = express.Router();
const { getPacientes, createPaciente } = require("../controllers/user.controller");

router.get("/pacientes/", getPacientes);
router.post("/pacientes/crear", createPaciente);

module.exports = router;