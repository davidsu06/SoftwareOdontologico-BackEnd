const Servicio = require('../models/Servicios');
const Paciente = require('../models/Paciente');
const Historia = require('../models/Historias');
const Personal = require('../models/Personal');
const { validationResult } = require('express-validator');

exports.crearHistoria = async (req,res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        let historias = new Historia(req.body);
        await historias.save();
        
        return res.json({ msg: "Historia Clínica creada correctamente"})
        
    } catch (error) {
        return res.status(400).json({ msg: "Error al insertar la Historia Clínica"})
    }
}

exports.obtenerHistorias = async (req,res) =>{
    try {
        const historias = await Historia.find({});
        return res.json({historias});
        
    } catch (error) {
        return res.status(500).send('Hubo un error');
    }
}

exports.modificarHistoria = async (req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer la informacion del proyecto
    const { pacienteId, personalId, fecha, hora, descripcion, servicio } = req.body;
    const nuevaHistoria = {};

    if(pacienteId){
        let paciente = await Paciente.findOne({ pacienteId });
        
        if (paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado'});
        }
        nuevaHistoria.pacienteId = pacienteId;
    }
    if(personalId){
        let personal = await Personal.findOne({ personalId });
        
        if (personal) {
            return res.status(404).json({ msg: 'Personal no encontrado'});
        }
        nuevaHistoria.personalId = personalId;
    }
    if(fecha){
        nuevaHistoria.fecha = fecha;
    }
    if(hora){
        nuevaHistoria.hora = hora;
    }
    if(descripcion){
        nuevaHistoria.descripcion = descripcion;
    }
    if(servicio){
        let servicioNom = await Servicio.findOne({ servicio });
        
        if (servicioNom) {
            return res.status(404).json({ msg: 'Servicio no encontrado'});
        }
        nuevaHistoria.servicio = servicio;
    }
    
    try {
        // revisar el ID
        let historias = await Historia.findById(req.params.id);       

        // Si la Historia Clínca no existe
        if (!historias) {
            return res.status(404).json('Historia Clínica no encontrada');
        }

        // Actualizar
        historias = await Historia.findByIdAndUpdate({_id: req.params.id}, {$set: nuevaHistoria}, {new: true});
        return res.json({historias});
    } catch (error) {
        return res.status(500).send('Error en el servidor');    
    }
}
