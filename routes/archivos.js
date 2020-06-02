const express = require('express');
const archivosController = require('../controllers/archivosController');

const router = express.Router();

router.post('/',
    archivosController.guardarArchivo 
);

router.get('/:name',
    archivosController.obtenerArchivo
);

router.delete('/:name',
    archivosController.eliminarArchivo
)

module.exports = router; 
