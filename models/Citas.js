const mongoose = require('mongoose');

const CitasSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        
    },

    hora: {
        type: String,
        required: true,
        
    }
});

module.exports = mongoose.model('Citas', CitasSchema);