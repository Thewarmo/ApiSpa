const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const verifyToken = require('../src/middleware/auth');
const { getCitas, crearCita, updateCita, deleteCita } = require("../src/controllers/citaController");

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
 *     Cita:
 *       type: object
 *       properties:
 *         pacienteId:
 *           type: string
 *         fecha:
 *           type: string
 *           format: date-time
 *         motivo:
 *           type: string
 *         estado:
 *           type: string
 *           enum: [pendiente, confirmada, cancelada, completada]
 *         duracion:
 *           type: number
 *           description: Duration in minutes
 */

/**
 * @swagger
 * /citas:
 *   get:
 *     summary: Get all appointments
 *     tags: [Citas]
 *     responses:
 *       200:
 *         description: List of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cita'
 * 
 *   post:
 *     summary: Create a new appointment
 *     tags: [Citas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cita'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Invalid input
 * 
 * /citas/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cita'
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 * 
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */

router.get("/", getCitas);
router.post("/crear", verifyToken,crearCita);
router.put("/cambiarCita/:id", verifyToken, updateCita);
router.delete("/eliminarCita/:id", verifyToken, deleteCita);

module.exports = router;