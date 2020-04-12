const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
const { check } = require('express-validator');

//Crea pacientes

router.post('/',
    //authFacturas,
    [
        check('nombre_servicio', 'El nombre es obligatorio').not().isEmpty(),
    ],
    serviciosController.crearServicio
);

router.get('/',
    //authPacientes,
    serviciosController.obtenerServicios
);
/*
router.put('/:id',
    //authPacientes,
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
    //authPacientes,
    pacienteController.eliminarPaciente
)
*/

module.exports = router;