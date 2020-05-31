const Personal = require('../models/Personal');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearPersonal = async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    const { documento, password} = req.body;

    try {

        let personal = await Personal.findOne({ documento });

        if (personal) {
            return res.status(400).json({ msg: 'El personal ya existe '})
        }

        personal = new Personal(req.body);

        const salt = await bcryptjs.genSalt(10);
        personal.password = await bcryptjs.hash(password,salt);

        await personal.save();

        //Creación y firma del JWT
        const payload = {
            personal: {
                id: personal.id
            }
        };

        jwt.sign(payload,process.env.SECRETA, {
            expiresIn: 3600
        }, (error,token) => {
            if(error) throw error;
            //res.json({ token });
        });
        res.json({ msg: 'Personal creado correctamente'}); 

    } catch (error) {
        res.status(400).send('Hubo un error');
    }
    
}

exports.consultarPersonal = async (req, res) => {

    try {
        const personal = await Personal.find();
        res.json({ personal });
        
    } catch (error) {
        res.status(400).json({ msg: 'Error al consultar personal' });
    }
}

exports.actualizarPersonal = async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    const { nombre, apellido, documento, fecha_nacimiento, telefono, direccion, password, cargo } = req.body;
    const nuevoPersonal = {};

    if (nombre) {
        nuevoPersonal.nombre = nombre;
    }

    if (apellido) {
        nuevoPersonal.apellido = apellido;
    }

    if (documento) {
        nuevoPersonal.documento = documento;
    }

    if (fecha_nacimiento) {
        nuevoPersonal.fecha_nacimiento = fecha_nacimiento;
    }

    if (telefono) {
        nuevoPersonal.telefono = telefono;
    }

    if (direccion) {
        nuevoPersonal.direccion = direccion;
    }

    if (password) {
        const salt = await bcryptjs.genSalt(10);
        nuevoPersonal.password = await bcryptjs.hash(password,salt);
    }

    if (cargo) {
        nuevoPersonal.cargo = cargo;
    }

    try {
        
        let personal = await Personal.findById(req.params.id);
        if (!personal) {
            return res.status(404).json({ msg: 'Personal no encontrado' })
        }

        personal = await Personal.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoPersonal }, { new: true });


        res.json({ personal });
        

    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar personal' }); //Error de servidor
    }
}

exports.eliminarPersonal = async (req, res) => {

    try {

        let personal = await Personal.findById(req.params.id);
        if (!personal) {
            return res.status(404).json({ msg: 'Personal no encontrado' })
        }

        await Personal.findByIdAndRemove({_id: req.params.id});

        res.json({ msg: 'Personal eliminado exitosamente' });


    } catch (error) {
        res.status(400).json({ msg: 'Error al eliminar' });
    }
}