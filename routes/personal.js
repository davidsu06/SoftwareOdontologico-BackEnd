const express = require('express');
const personalController = require('../controllers/personalController');
const { check } = require('express-validator');
const authPersonal = require('../middleware/authPersonal');

const router = express.Router();

// Creación de personal
// api/personal
router.post('/', 
    authPersonal,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('apellido','El apellido es obligatorio').not().isEmpty(),
        check('documento','El documento es obligatorio').not().isEmpty(),
        check('fecha_nacimiento','La fecha es obligatoria').not().isEmpty(),
        check('telefono','El telefono es obligatorio').not().isEmpty(),
        check('direccion','La direccion es obligatoria').not().isEmpty(),
        check('password','La contrasena debe ser mínimo de 6 caracteres').isLength({ min: 6}),
        check('cargo','El cargo es obligatorio').not().isEmpty()
    ],
    personalController.crearPersonal
);

router.get('/', 
    authPersonal,
    personalController.consultarPersonal
);

router.put('/:id', 
    authPersonal,
    [
        check('nombre','El nombre es obligatorio').optional().not().isEmpty(),
        check('apellido','El apellido es obligatorio').optional().not().isEmpty(),
        check('documento','El documento es obligatorio').optional().not().isEmpty(),
        check('fecha_nacimiento','La fecha es obligatoria').optional().not().isEmpty(),
        check('telefono','El telefono es obligatorio').optional().not().isEmpty(),
        check('direccion','La direccion es obligatoria').optional().not().isEmpty(),
        check('password','La contrasena debe ser mínimo de 6 caracteres').optional().isLength({ min: 6}),
        check('cargo','El cargo es obligatorio').not().optional().isEmpty()
    ],
    personalController.actualizarPersonal
);

router.delete('/:id', 
    authPersonal,
    personalController.eliminarPersonal
);


module.exports = router; 