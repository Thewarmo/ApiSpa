const Insumo = require('../models/Insumo');

// Get all supplies
const getInsumos = async (req, res) => {
    try {
        const insumos = await Insumo.find();
        res.json(insumos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new supply
const crearInsumo = async (req, res) => {
    try {
        const insumo = new Insumo(req.body);
        const insumoGuardado = await insumo.save();
        res.status(201).json({
            estado: true,
            mensaje: 'Insumo creado correctamente',
            insumo: insumoGuardado
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update supply
const updateInsumo = async (req, res) => {
    try {
        const { _id, createdAt, updatedAt, __v, ...updateData } = req.body;
        const insumo = await Insumo.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        if (!insumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.json({
            estado: true,
            mensaje: 'Insumo actualizado correctamente',
            insumo
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete supply
const deleteInsumo = async (req, res) => {
    try {
        const insumo = await Insumo.findByIdAndDelete(req.params.id);
        if (!insumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.json({
            estado: true,
            mensaje: 'Insumo eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get supplies for select
const getInsumosSelect = async (req, res) => {
    try {
        const insumos = await Insumo.find().select('_id nombre precio');
        res.json(insumos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getInsumos,
    crearInsumo,
    updateInsumo,
    deleteInsumo,
    getInsumosSelect
};