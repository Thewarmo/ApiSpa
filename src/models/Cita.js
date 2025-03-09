const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    pacienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true
    },
    procedimientoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Procedimiento',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
        default: 'pendiente'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cita', citaSchema);