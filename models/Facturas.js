const mongoose = require('mongoose');

const FacturasSchema = new mongoose.Schema({
    valor:{
        type: String,
        required: true,
        trim: true
    }, 
    fecha:{
        type: String,
        required: true,
        trim: true
    },
    documento_paciente:{
        type: String,
        required: true,
        trim: true
    },
    nombre_paciente:{
        type: String,
        required: true,
        trim: true
    },
    documento_cajero:{
        type: String,
        required: true,
        trim: true
    },
    nombre_cajero:{
        type: String,
        required: true,
        trim: true
    },
    tratamiento:{
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Facturas', FacturasSchema);