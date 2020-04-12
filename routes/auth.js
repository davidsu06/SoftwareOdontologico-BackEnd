
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
// const auth = require('../middleware/auth');
const authPersonal = require('../middleware/authPersonal');
const authPacientes = require('../middleware/authPacientes');


router.post('/',
    authController.autenticarUsuario
);

// router.get('/:documento',
//     auth,
//     authController.usuarioAutenticado
// );

router.get('/',
    authPersonal,
    authPacientes,
    authController.usuarioAutenticado
);

module.exports = router;