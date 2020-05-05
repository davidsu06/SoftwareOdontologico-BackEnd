const mongoose = require('mongoose');

const ServiciosSchema = mongoose.Schema({
    nombre_servicio: {
        type: String,
        required: true,
        trim: true
    },
    precioTotal: {
        type: Number,
        required: true,
        trim: true
    },
    cantidadCitas: {
        type: Number,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('servicios',ServiciosSchema);