const Cita = require('../models/Cita');

// Get all appointments
const getCitas = async (req, res) => {
    try {
        const citas = await Cita.find()
            .populate('pacienteId', 'nombre documento')
            .populate('procedimientoId', 'nombre duracion precio');
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new appointment
const crearCita = async (req, res) => {
    try {
        const cita = new Cita(req.body);
        const citaGuardada = await cita.save();
        res.status(201).json({ 
                                estado:true,
                                mensaje: 'Cita creada correctamente', 
                                cita: citaGuardada});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update appointment
const updateCita = async (req, res) => {
    try {
        const { _id, createdAt, updatedAt, __v, ...updateData } = req.body;

        const cita = await Cita.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        ).populate('pacienteId', 'nombre documento')
          .populate('procedimientoId', 'nombre duracion precio');

        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({
            estado: true,
            mensaje: 'Cita actualizada correctamente',
            cita: cita
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete appointment
const deleteCita = async (req, res) => {
    try {
        const cita = await Cita.findByIdAndDelete(req.params.id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCitas,
    crearCita,
    updateCita,
    deleteCita
};