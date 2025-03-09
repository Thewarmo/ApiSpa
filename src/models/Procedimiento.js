const mongoose = require('mongoose');

const procedimientoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Procedimiento', procedimientoSchema);