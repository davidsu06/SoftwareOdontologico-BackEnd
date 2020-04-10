const mongoose = require('mongoose');

const FacturasSchema = mongoose.Schema({
    valor:{
        type: String,
        required: true,
        trim: true
    }, 
    fecha:{
        type: Date,
        required: true,
        trim: true
    },
    documento_paciente:{
        type: String,
        required: true,
        trim: true
    },
    documento_cajero:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Facturas', FacturasSchema);