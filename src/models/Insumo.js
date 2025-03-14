const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    unidadMedida: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Insumo', insumoSchema);