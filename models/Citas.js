const mongoose = require('mongoose');

const CitasSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        
    },

    hora: {
        type: String,
        required: true,
        
    },

    pacienteId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Paciente'
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Citas', CitasSchema);