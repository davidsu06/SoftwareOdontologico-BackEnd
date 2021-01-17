const express = require('express');
const router = express.Router();
const facturasController = require('../controllers/facturasController');
const { check } = require('express-validator');


// Creación de Facturas
router.post('/',
    [
        check('documento_paciente', 'El documento es obligatorio').not().isEmpty(),
        check('nombre_paciente', 'El nombre del paciente es obligatorio').not().isEmpty(),
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('documento_cajero', 'El cajero es obligatorio').not().isEmpty(),
        check('nombre_cajero', 'El nombre del cajero es obligatorio').not().isEmpty(),
        check('estado', 'El estado de la factura es obligatorio').not().isEmpty()
    ],
    facturasController.crearFactura
);

// Obtención de Facturas
router.get('/',
    facturasController.obtenerFacturas
);

// Obtención de una factura determinada
router.get('/:id',
    facturasController.obtenerFactura
);

// Modifica el estado de la factura
router.put('/:id',
    [
        check('documento_paciente', 'El documento es obligatorio').not().isEmpty(),
        check('nombre_paciente', 'El nombre del paciente es obligatorio').not().isEmpty(),
        check('valor', 'El valor es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria').not().isEmpty(),
        check('documento_cajero', 'El cajero es obligatorio').not().isEmpty(),
        check('nombre_cajero', 'El nombre del cajero es obligatorio').not().isEmpty(),
        check('estado', 'El estado de la factura es obligatorio').not().isEmpty()
    ],
    facturasController.modificarEstadoFactura
)

module.exports = router;