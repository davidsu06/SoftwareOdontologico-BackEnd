const mongoose = require('mongoose');

const ServiciosSchema = mongoose.Schema({
    nombre_servicio: {
        type: String,
        required: true,
        trim: true
    },
    

});

module.exports = mongoose.model('servicios',ServiciosSchema);