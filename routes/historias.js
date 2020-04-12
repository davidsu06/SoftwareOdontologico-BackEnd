const express = require('express');
const historiasController = require('../controllers/historiasController');
const { check } = require('express-validator');

const router = express.Router();

// Creación de Historias Clínicas
// api/historias
router.post('/', 
    [
        check('pacienteId','El Id del paciente es obligatoria').not().isEmpty(),
        check('personalId','El Id del Personal es obligatoria').not().isEmpty(),
        check('fecha','La fecha de la Cita es obligatoria').not().isEmpty(),
        check('hora','La Hora de la Cita es obligatoria').not().isEmpty(),
        check('descripcion','La Descripción es obligatoria').not().isEmpty()
    ],
    historiasController.crearHistoria 
);

router.get('/',
    historiasController.obtenerHistorias
)

router.put('/:id',
    [
        check('pacienteId','El Id del paciente es obligatoria').not().isEmpty(),
        check('personalId','El Id del Personal es obligatoria').not().isEmpty(),
        check('fecha','La fecha de la Cita es obligatoria').not().isEmpty(),
        check('hora','La Hora de la Cita es obligatoria').not().isEmpty(),
        check('descripcion','La Descripción es obligatoria').not().isEmpty()
    ],
    historiasController.modificarHistoria
)

module.exports = router; 
