const mongoose = require('mongoose');

const CitasSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Citas', CitasSchema);