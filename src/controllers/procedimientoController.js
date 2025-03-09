const Procedimiento = require('../models/Procedimiento');

const getProcedimientos = async (req, res) => {
    try {
        const procedimientos = await Procedimiento.find();
        res.json(procedimientos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const crearProcedimiento = async (req, res) => {
    try {
        const procedimiento = new Procedimiento(req.body);
        const procedimientoGuardado = await procedimiento.save();
        res.status(201).json({
            estado: true,
            mensaje: 'Procedimiento creado correctamente',
            procedimiento: procedimientoGuardado
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProcedimiento = async (req, res) => {
    try {
        const { _id, createdAt, updatedAt, __v, ...updateData } = req.body;
        const procedimiento = await Procedimiento.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        if (!procedimiento) {
            return res.status(404).json({ message: 'Procedimiento no encontrado' });
        }
        res.json({
            estado: true,
            mensaje: 'Procedimiento actualizado correctamente',
            procedimiento
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProcedimiento = async (req, res) => {
    try {
        const procedimiento = await Procedimiento.findByIdAndDelete(req.params.id);
        if (!procedimiento) {
            return res.status(404).json({ message: 'Procedimiento no encontrado' });
        }
        res.json({ 
            estado: true,
            mensaje: 'Procedimiento eliminado correctamente' 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProcedimientos,
    crearProcedimiento,
    updateProcedimiento,
    deleteProcedimiento
};