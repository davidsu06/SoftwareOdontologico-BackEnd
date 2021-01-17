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
        let payload;

        if (!paciente && !personal) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }
        else if (paciente) 
        {
            // Revisar pass
            const passCorrecto =  await bcryptjs.compare(password, paciente.password);
            if (!passCorrecto) {
                return res.status(400).json({msg: 'Password incorrecto'})
            }

            // Si todo es correcto
            // Crear  JWT
            payload = {
                paciente: {
                    id: paciente.id
                }
            };

        }
        else if(personal)
        {
            // Revisar pass
            const passCorrecto =  await bcryptjs.compare(password, personal.password);
            if (!passCorrecto) {
                return res.status(400).json({msg: 'Password incorrecto'})
            }

            // Si todo es correcto
            // Crear  JWT
            payload = {
                personal: {
                    id: personal.id
                }
            };

        }
        // Firmar JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;

            // Mensaje
            return res.json({token});
        });
    } catch (error) {
        return res.status(500).json({msg: 'Hubo un error'});
    }
};

exports.usuarioAutenticado = async (req, res) =>{
    try {  
        let personal, paciente, tipoUsuario;
        if (req.personal != undefined) {

            personal = await Personal.findById(req.personal.id).select('-password');
            tipoUsuario = personal;
            return res.json({tipoUsuario});
        }else if (req.paciente != undefined) {

            paciente = await Paciente.findById(req.paciente.id).select('-password');
            tipoUsuario = paciente;
            return res.json({tipoUsuario});
        }else{
            return res.json({msg: 'No existe usuario'})
        }


    } catch (error) {
        return res.status(500).json({msg: 'Hubo un error'});
    }   
};