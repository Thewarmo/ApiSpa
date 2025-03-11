const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const verifyToken = require('../src/middleware/auth');
const { getPacientes, createPaciente } = require("../src/controllers/pacienteController");


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all routes
router.use(apiLimiter);

/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         documento:
 *           type: string
 *         email:
 *           type: string
 *         telefono:
 *           type: string
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Returns all patients
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: List of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Create a new patient
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       400:
 *         description: Invalid input
 */
router.get("/", getPacientes);


router.post("/crear", verifyToken,createPaciente);

module.exports = router;
