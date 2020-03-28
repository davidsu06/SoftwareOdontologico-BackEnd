const Paciente = require('../models/Paciente');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer email y password 
    const {email, password} = req.body;

    try {
        // Revisar que este registrado
        let paciente = await Paciente.findOne({email})
        if (!paciente) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        // Revisar pass
        const passCorrecto = await bcryptjs.compare(password, paciente.password);
        if (!passCorrecto) {
            return res.status(400).json({msg: 'Password incorrecto'})
        }

        // Si todo es correcto
        // Crear  JWT
        const payload = {
            paciente: {
                id: paciente.id
            }
        };

        // Firmar JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;

            // Mensaje
            res.json({token});
        });
    } catch (error) {
        console.log(error);
        
    }
}