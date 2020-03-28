
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');


router.post('/',
    [
        check('documento', 'El documento es obligatorio').not().isEmpty(),       
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    ],
    authController.autenticarUsuario
);

module.exports = router;