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
    const {documento, password} = req.body;

    
    try {
        //Revisar que el paciente resgistrado sea unico
        let paciente = await Paciente.findOne({documento});

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
            return res.json({token});
        });

    } catch (error) {
        res.status(400).send('Hubo un error');
        
    }
    
}

// Obtener pacientes

exports.obtenerPacientes = async (req,res) =>{
    try {
        const pacientes = await Paciente.find({});
        return res.json({pacientes});
        
    } catch (error) {
        return res.status(500).send('Hubo un error');
    }
}

exports.pacienteAutenticado = async (req, res) =>{
    try {  
        
        const paciente = await Paciente.findById({"documento": req.paciente.id}).select('-password');
        return res.json({paciente});
       
    } catch (error) {
        return res.status(500).json({msg: 'Hubo un error'});
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
    const {nombre, apellido, telefono, password, direccion } = req.body;
    const nuevoPaciente = {};

    if (nombre) {
        nuevoPaciente.nombre = nombre;
    }
    
    if(apellido){
        nuevoPaciente.apellido = apellido;
    }
    
    if(telefono){
        nuevoPaciente.telefono = telefono;
    }
    
    if(password){
        const salt = await bcryptjs.genSalt(10);
        nuevoPaciente.password = await bcryptjs.hash(password, salt);
    }
    
    if(direccion){
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
        return res.json({paciente});
    } catch (error) {
        return res.status(500).send('Error en el servidor');   
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
        return res.json({msg: 'Paciente eliminado'})
    } catch (error) {
        return res.status(500).send('Error en el servidor');
    }
}
