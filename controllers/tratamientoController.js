const Servicio = require('../models/Servicios');
const Paciente = require('../models/Paciente');
const Tratamiento = require('../models/Tratamiento');
const { validationResult } = require('express-validator');

exports.iniciarTratamiento = async (req,res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    
    try {
        let tratamiento = new Tratamiento(req.body);
        console.log(req.body);
        await tratamiento.save();
        
        res.json({ msg: "Tratamiento iniciado correctamente"})
        
    } catch (error) {
        res.status(400).json({ msg: "Error al insertar el tratamiento"})
    }

}

exports.obtenerTratamientos = async (req,res) =>{
    try {
        const tratamientos = await Tratamiento.find({});
        res.json({tratamientos});
        
    } catch (error) {
        console.log(error);
        res.statud(500).send('Hubo un error');
        
    }
}

exports.actualizarTratamiento = async (req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer la informacion del proyecto
    const { pacienteId, pacienteNombre, servicio, citasVistas, cuotas, saldoAbonado, estado } = req.body;
    const nuevoTratamiento = {};

    if(pacienteId && pacienteNombre){
        let paciente = await Paciente.findOne({ pacienteId });
        
        if (paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado'});
        }
        
        nuevoTratamiento.pacienteId = pacienteId;
        nuevoTratamiento.pacienteNombre = pacienteNombre;
    }
    
    if(servicio){
        let servicioNom = await Servicio.findOne({ servicio });
        
        if (servicioNom) {
            return res.status(404).json({ msg: 'Servicio no encontrado'});
        }
        nuevoTratamiento.servicio = servicio;
    }

    if(citasVistas){
        nuevoTratamiento.citasVistas = citasVistas;
    }

    if(cuotas){
        nuevoTratamiento.cuotas = cuotas;
    }

    if(saldoAbonado){
        nuevoTratamiento.saldoAbonado = saldoAbonado;
    }

    if(estado){
        nuevoTratamiento.estado = estado;
    }
    
    try {
        // revisar el ID
        let tratamiento = await Tratamiento.findById(req.params.id);       

        // Si el Tratamiento no existe
        if (!tratamiento) {
            return res.status(404).json('Tratamiento no encontrado');
        }

        // Actualizar
        tratamiento = await Tratamiento.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoTratamiento}, {new: true});
        res.json({tratamiento});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}

exports.eliminarTratamiento = async (req, res) => {
    try {
        // revisar el ID
        let tratamiento = await Tratamiento.findById(req.params.id);        

        // Si el Tratamiento existe
        if (!tratamiento) {
            return res.status(404).json('Tratamiento no encontrado');
        }

        // Eliminar
        await Tratamiento.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Tratamiento eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}
