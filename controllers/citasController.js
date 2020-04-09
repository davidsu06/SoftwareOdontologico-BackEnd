const Citas = require('../models/Citas');
// const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');

exports.crearCitas = async (req,res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { fecha } = req.body;
    
    
    try {

        let citas = await Citas.findOne({ fecha });

        if (citas) {
            return res.status(400).json({ msg: 'La cita ya existe'});
        }
        
        citas = new Citas(req.body);
        console.log(req.body);
        await citas.save();
        
        res.status(400).json({ msg: "Cita creada correctamente"})
        
    } catch (error) {
        res.status(400).json({ msg: "Error al insertar cita"})
    }

}

exports.obtenerCitas = async (req,res) =>{
    try {
        const citas = await Citas.find({});
        res.json({citas});
        
    } catch (error) {
        console.log(error);
        res.statud(500).send('Hubo un error');
        
    }
}

exports.modificarCita = async (req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer la informacion del proyecto
    const {fecha, hora} = req.body;
    const nuevaCita = {};

    if (fecha) {
        nuevaCita.fecha = fecha;
    }
    
    if(hora){
        nuevaCita.hora = hora;
    }

    try {
        // revisar el ID
        let citas = await Citas.findById(req.params.id);       

        // Si la cita no existe
        if (!citas) {
            return res.status(404).json('Cita no encontrada');
        }

        // Actualizar
        Citas = await Citas.findByIdAndUpdate({_id: req.params.id}, {$set: nuevaCita}, {new: true});
        res.json({citas});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}

exports.eliminarCita = async (req, res) => {
    try {
        // revisar el ID
       
        let citas = await Citas.findById(req.params.id);         

        // Si el paciente existe
        if (!citas) {
            return res.status(404).json('Cita no encontrada');
        }

        // Eliminar
        await Citas.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Cita eliminada'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}