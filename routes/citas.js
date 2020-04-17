const express = require('express');
const citasController = require('../controllers/citasController');
const { check } = require('express-validator');
// const authCitas = require('../middleware/authCitas');

const router = express.Router();

// Creación de citas
// api/citas
router.post('/', 
    // authCitas,
    [
        check('fecha','La fecha es obligatoria').not().isEmpty(),
        check('hora','La hora es obligatoria').not().isEmpty(),
        check('estado','El estado es obligatorio').not().isEmpty(),
        check('pacienteId','El id del paciente es obligatorio').not().isEmpty()
    ],
    citasController.crearCitas 
);

router.get('/',
    // authCitas,
    citasController.obtenerCitas
)

router.get('/:pacienteId',
    // authCitas,
    citasController.citaExistentePacienteId
)

router.put('/:id',
    //authCitas,
    [
        check('fecha','La fecha es opcional').optional().not().isEmpty(),
        check('hora','La hora es opcional').optional().not().isEmpty(),
        check('estado','El estado opcional').optional().not().isEmpty(),
        check('pacienteId','El paciente es opcional').optional().not().isEmpty()
    ],
    citasController.modificarCita
)



router.delete('/:id',
    //authCitas,
    citasController.eliminarCita
)

module.exports = router; 
