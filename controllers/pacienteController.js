const Paciente = require('../models/Paciente');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearPaciente = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    // Extraer email y password
    const {cedula, password} = req.body;

    
    try {
        //Revisar que el paciente resgistrado sea unico
        let paciente = await Paciente.findOne({cedula});

        if (paciente) {
            return res.status(400).json({msg: 'El paciente ya existe'});
        }

        // Crear paciente
        paciente = new Paciente(req.body);

        // Encriptar pass
        const salt = await bcryptjs.genSalt(10);
        paciente.password = await bcryptjs.hash(password, salt);

        // Guardar paciente
        await paciente.save();

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
        res.status(400).send('Hubo un error');
        
    }
    
}

// Obtener pacientes

exports.obtenerPacientes = async (req,res) =>{
    try {
        const pacientes = await Paciente.find({});
        res.json({pacientes});
        
    } catch (error) {
        console.log(error);
        res.statud(500).send('Hubo un error');
        
    }
}

// Modificar paciente

exports.modificarPaciente = async (req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer la informacion del proyecto
    const {nombre, apellido, telefono, email, password, direccion } = req.body;
    const nuevoPaciente = {};

    if (nombre) {
        nuevoPaciente.nombre = nombre;
    }else if(apellido){
        nuevoPaciente.apellido = apellido;
    }else if(telefono){
        nuevoPaciente.telefono = telefono;
    }else if(email){
        nuevoPaciente.email = email;
    }else if(password){
        const salt = await bcryptjs.genSalt(10);
        nuevoPaciente.password = await bcryptjs.hash(password, salt);
        
    }else if(direccion){
        nuevoPaciente.direccion = direccion;
    }

    try {
        // revisar el ID
        let paciente = await Paciente.findById(req.params.id);        

        // Si el paciente existe
        if (!paciente) {
            return res.status(404).json('Paciente no encontrado');
        }

        // Actualizar
        paciente = await Paciente.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoPaciente}, {new: true});
        res.json({paciente});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}

// Eliminar paciente

exports.eliminarPaciente = async (req, res) => {
    try {
        // revisar el ID
        let paciente = await Paciente.findById(req.params.id);        

        // Si el paciente existe
        if (!paciente) {
            return res.status(404).json('Paciente no encontrado');
        }

        // Eliminar
        await Paciente.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Paciente eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}
