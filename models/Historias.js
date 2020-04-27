const mongoose = require('mongoose');

const HistoriaSchema = mongoose.Schema({
    pacienteId:{
        type: String,
        required: true,
        trim: true
    },
    personalId:{
        type: String,
        required: true,
        trim: true
    },
    fecha:{
        type: Date,
        required: true,
        trim: true
    }, 
    hora:{
        type: String,
        required: true,
        trim: true
    }, 
    descripcion:{
        type:String,
        required: true,
        trim: true
    },
    servicio:{
        type:String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Historias', HistoriaSchema);