const mongoose = require('mongoose');

const TratamientoSchema = mongoose.Schema({
    pacienteId:{
        type: String,
        required: true,
        trim: true
    },
    pacienteNombre:{
        type:String,
        required: true,
        trim: true
    },
    servicio:{
        type:String,
        required: true,
        trim: true
    },
    citasVistas:{
        type:Number,
        required: true,
        trim: true
    },
    cuotas:{
        type:Number,
        required: true,
        trim: true
    },
    saldoAbonado:{
        type:Number,
        required: true,
        trim: true
    },
    estado:{
        type:String,
        required: true,
        trim: true
    }  
});

module.exports = mongoose.model('Tratamientos', TratamientoSchema);