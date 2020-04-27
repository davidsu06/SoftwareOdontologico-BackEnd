const Servicios = require('../models/Servicios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


exports.crearServicio = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    
    try {
        // Crear Servicio
        let servicio = new Servicios(req.body);
        console.log(servicio);
        // Guardar Servicio
        await servicio.save();
        res.send('servicio creado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
        
    }
    res.json(true);
}

// Obtener Servicios
exports.obtenerServicios = async (req,res) =>{
    try {
        const servicio = await Servicios.find();
        res.json({servicio});
        
    } catch (error) {
        console.log(error);
        res.statud(500).send('Hubo un error');
        
    }
}

// Modificar Servicio
exports.modificarServicio = async (req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer la informacion del Servicio
    const {nombre_servicio} = req.body;
    const nuevoServicio = {};

    if (nombre_servicio) {
        nuevoServicio.nombre_servicio = nombre_servicio;
    }

    try {
        // revisar el ID
        let servicio = await Servicios.findById(req.params.id);        

        // Si el paciente existe
        if (!servicio) {
            return res.status(404).json('Servicio no encontrado');
        }

        // Actualizar
        servicio = await Servicios.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoServicio}, {new: true});
        res.json({servicio});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}

// Eliminar Servicio
exports.eliminarServicio = async (req, res) => {
    try {
        // revisar el ID
        let servicio = await Servicios.findById(req.params.id);        

        // Si el paciente existe
        if (!servicio) {
            return res.status(404).json('Servicio no encontrado');
        }

        // Eliminar
        await Servicios.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Servicio eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}