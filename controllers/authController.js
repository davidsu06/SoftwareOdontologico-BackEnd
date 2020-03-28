const Paciente = require('../models/Paciente');
const Personal = require('../models/Personal');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer documento y password 
    const {documento, password} = req.body;

    try {
        // Revisar que este registrado
        let paciente = await Paciente.findOne({documento});
        let personal = await Personal.findOne({documento});
        let tipoUsuario;

        if (!paciente && !personal) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }
        else if(paciente) {
            tipoUsuario = paciente;
        }
        else if(personal){
            tipoUsuario = personal;
        }

        
        // Revisar pass
        const passCorrecto =  await bcryptjs.compare(password, tipoUsuario.password);
        if (!passCorrecto) {
            return res.status(400).json({msg: 'Password incorrecto'})
        }

        // Si todo es correcto
        // Crear  JWT
        const payload = {
            tipoUsuario: {
                id: tipoUsuario.id
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