const mongoose = require('mongoose');

const PersonalSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    documento: {
        type: String,
        required: true,
        trim: true,
        unique: true      
    },
   fecha_nacimiento: {
        type: Date,
        required: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    cargo: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model('Personal',PersonalSchema);
