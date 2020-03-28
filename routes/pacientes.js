const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController')
const { check } = require('express-validator');

//Crea pacientes

router.post('/',
    [
        check('cedula', 'La cedula es obligatoria').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    ],


    pacienteController.crearPaciente
);

router.get('/',
    pacienteController.obtenerPacientes
)

router.put('/:id',
    pacienteController.modificarPaciente
)

router.delete('/:id',
    pacienteController.eliminarPaciente
)


module.exports = router;