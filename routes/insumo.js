const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const verifyToken = require('../src/middleware/auth');
const { 
    getInsumos, 
    crearInsumo, 
    updateInsumo, 
    deleteInsumo,
    getInsumosSelect
} = require("../src/controllers/insumoController");

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
 *     Insumo:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         precio:
 *           type: number
 *         fechaCompra:
 *           type: string
 *           format: date-time
 *         observacion:
 *           type: string
 */

/**
 * @swagger
 * /insumos:
 *   get:
 *     summary: Get all supplies
 *     tags: [Insumos]
 *     responses:
 *       200:
 *         description: List of supplies
 */
router.get("/", getInsumos);

/**
 * @swagger
 * /insumos/crear:
 *   post:
 *     summary: Create a new supply
 *     tags: [Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 */
router.post("/crear", verifyToken, crearInsumo);

/**
 * @swagger
 * /insumos/modificar/{id}:
 *   put:
 *     summary: Update a supply
 *     tags: [Insumos]
 */
router.put("/modificar/:id", verifyToken, updateInsumo);

/**
 * @swagger
 * /insumos/eliminar/{id}:
 *   delete:
 *     summary: Delete a supply
 *     tags: [Insumos]
 */
router.delete("/eliminar/:id", verifyToken, deleteInsumo);

/**
 * @swagger
 * /insumos/select:
 *   get:
 *     summary: Get supplies for select
 *     tags: [Insumos]
 */
router.get("/select", getInsumosSelect);

module.exports = router;