const express = require('express');
const tratamientoController = require('../controllers/tratamientoController');
const { check } = require('express-validator');

const router = express.Router();

// api/tratamientos
// Creación de Tratamientos
router.post('/', 
    [
        check('pacienteId','El Id del paciente es obligatorio').not().isEmpty(),
        check('pacienteNombre','El Nombre del paciente es obligatorio').not().isEmpty(),
        check('servicio','El nombre del servicio es obligatorio').not().isEmpty(),
        check('citasVistas','La cantidad de citas vistas en el tratamiento son obligatorias').not().isEmpty(),
        check('cuotas','La cantidad de cuotas del tratamiento son obligatorias').not().isEmpty(),
        check('saldoAbonado','El saldo Abonado es obligatorio').not().isEmpty(),
        check('estado','El estado del tratamiento es obligatorio').not().isEmpty()
    ],
    tratamientoController.iniciarTratamiento 
);

// Obtención de tratamientos
router.get('/',
    tratamientoController.obtenerTratamientos
)

// Actualización de tratamientos
router.put('/:id',
    [
        check('pacienteId','El Id del paciente es obligatorio').not().isEmpty(),
        check('pacienteNombre','El Nombre del paciente es obligatorio').not().isEmpty(),
        check('servicio','El nombre del servicio es obligatorio').not().isEmpty(),
        check('citasVistas','La cantidad de citas vistas en el tratamiento son obligatorias').not().isEmpty(),
        check('cuotas','La cantidad de cuotas del tratamiento son obligatorias').not().isEmpty(),
        check('saldoAbonado','El saldo Abonado es obligatorio').not().isEmpty(),
        check('estado','El estado del tratamiento es obligatorio').not().isEmpty()
    ],
    tratamientoController.actualizarTratamiento
)

// Eliminar Tratamiento
router.delete('/:id',
    tratamientoController.eliminarTratamiento
)

module.exports = router; 
