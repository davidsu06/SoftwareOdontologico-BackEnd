const express = require('express');
const citasController = require('../controllers/citasController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

// Creación de citas
// api/citas
router.post('/', 
    auth,
    [
        check('fecha','La fecha es obligatoria').not().isEmpty(),
    ],
    citasController.crearCitas 
);

module.exports = router; 
