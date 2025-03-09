const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const verifyToken = require('../src/middleware/auth');
const { 
    getProcedimientos, 
    crearProcedimiento, 
    updateProcedimiento, 
    deleteProcedimiento 
} = require("../src/controllers/procedimientoController");


// Rate limiting
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
 *     Procedimiento:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
 *         duracion:
 *           type: number
 *         precio:
 *           type: number
 */

/**
 * @swagger
 * /procedimientos:
 *   get:
 *     summary: Get all procedures
 *     tags: [Procedimientos]
 *     responses:
 *       200:
 *         description: List of procedures
 */
router.get("/", getProcedimientos);

/**
 * @swagger
 * /procedimientos/crear:
 *   post:
 *     summary: Create a new procedure
 *     tags: [Procedimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Procedimiento'
 */
router.post("/crear", verifyToken, crearProcedimiento);

/**
 * @swagger
 * /procedimientos/modificar/{id}:
 *   put:
 *     summary: Update a procedure
 *     tags: [Procedimientos]
 */
router.put("/modificar/:id", verifyToken, updateProcedimiento);

/**
 * @swagger
 * /procedimientos/eliminar/{id}:
 *   delete:
 *     summary: Delete a procedure
 *     tags: [Procedimientos]
 */
router.delete("/eliminar/:id", verifyToken, deleteProcedimiento);



module.exports = router;