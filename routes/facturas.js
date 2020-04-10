const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturasController');
const { check } = require('express-validator');

//Crea pacientes

router.post('/',
    //authFacturas,
    [
        check('documento_paciente', 'El documento es obligatorio').not().isEmpty(),
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('documento_cajero', 'El cajero es obligatorio').not().isEmpty(),
    ],
    facturasController.crearFactura
);

router.get('/',
    //authPacientes,
    facturasController.obtenerFacturas
)
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