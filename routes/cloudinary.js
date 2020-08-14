const express = require('express');
const cloudinaryController = require('../controllers/cloudinaryController');

const router = express.Router();

router.post('/',
    cloudinaryController.guardarArchivo 
);

router.delete('/',
    cloudinaryController.eliminarArchivo
)

module.exports = router; 
