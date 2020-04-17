const Factura = require('../models/Facturas');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


exports.crearFactura = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    
    try {
        
        // Crear factura
        let factura = new Factura(req.body);
        console.log(factura);
        // Guardar factura
        await factura.save();
        res.send('factura creada correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
        
    }
    res.json(true);
}

// Obtener pacientes

exports.obtenerFacturas = async (req,res) =>{
    try {
        const facturas = await Factura.find();
        res.json({facturas});
        
    } catch (error) {
        console.log(error);
        res.statud(500).send('Hubo un error');
        
    }
}
/*
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
}*/