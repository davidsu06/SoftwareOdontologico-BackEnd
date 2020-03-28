const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController')
const { check } = require('express-validator');
const authPacientes = require('../middleware/authPacientes');

//Crea pacientes

router.post('/',
    authPacientes,
    [
        check('documento', 'El documento es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    ],
    pacienteController.crearPaciente
);

router.get('/',
    authPacientes,
    pacienteController.obtenerPacientes
)

router.put('/:id',
    authPacientes,
    [
        check('nombre', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').optional().not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').optional().not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').optional().not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres').optional().isLength({ min: 6})
    ],
    pacienteController.modificarPaciente
)

router.delete('/:id',
    authPacientes,
    pacienteController.eliminarPaciente
)


module.exports = router;