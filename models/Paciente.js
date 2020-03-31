const mongoose = require('mongoose');

const PacientesSchema = mongoose.Schema({
    documento:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true,
        trim: true
    }, 
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    fnacimiento:{
        type:Date,
        required: true
    },
    telefono:{
        type: String,
        required: true,
        trim: true
    }, 
    direccion:{
        type: String,
        required: true,
    }, 
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Paciente', PacientesSchema);