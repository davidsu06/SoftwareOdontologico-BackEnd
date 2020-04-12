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
        
        // Crear paciente
        let servicio = new Servicios(req.body);
        console.log(servicio);
        // Guardar paciente
        await servicio.save();
        res.send('servicio creado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
        
    }
    res.json(true);
}

// Obtener pacientes

exports.obtenerServicios = async (req,res) =>{
    try {
        const servicio = await Servicios.find();
        res.json({servicio});
        
    } catch (error) {
        console.log(error);
        res.statud(500).send('Hubo un error');
        
    }
}