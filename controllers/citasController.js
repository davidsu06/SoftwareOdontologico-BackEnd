const Citas = require('../models/Citas');
const Paciente = require('../models/Paciente');
const { validationResult } = require('express-validator');

exports.crearCitas = async (req,res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }  
    
    try {

        let citas = new Citas(req.body);
        await citas.save();
        
        res.json({ msg: "Cita creada correctamente"})
        
    } catch (error) {
        res.status(400).json({ msg: "Error al insertar cita"})
    }

}

exports.obtenerCitas = async (req,res) =>{
    try {
        const citas = await Citas.find({});
        res.json({citas});
        
    } catch (error) {
        // console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.citaExistentePacienteId = async (req,res) =>{
    try {
        // console.log(req.params);
        const {pacienteId, tipo} = req.params

        const cita = await Citas.find(
            { $and:
                [
                    { pacienteId: `${pacienteId}` },
                    { estado: "Asignado" },
                    { tipo: `${tipo}`} 
                ]
            }
        )
        res.json({cita});
        
    } catch (error) {
        res.status(500).send('Hubo un error');   
    }
}

exports.modificarCita = async (req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    //Extraer la informacion del proyecto
    const {fecha, hora, pacienteId, estado, tipo} = req.body;
    const nuevaCita = {};

    if (fecha) {
        nuevaCita.fecha = fecha;
    }
    
    if(hora){
        nuevaCita.hora = hora;
    }

    if(pacienteId){
        let paciente = await Paciente.findOne({ pacienteId });
        if (paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado'});
        }
        nuevaCita.pacienteId = pacienteId;
    }

    if (estado) {
        nuevaCita.estado = estado;
    }

    if (tipo) {
        nuevaCita.tipo = tipo;
    }

    try {
        // revisar el ID
        let citas = await Citas.findById(req.params.id);       

        // Si la cita no existe
        if (!citas) {
            return res.status(404).json('Cita no encontrada');
        }
        // Actualizar
        citas = await Citas.findByIdAndUpdate({_id: req.params.id}, {$set: nuevaCita}, {new: true});
        res.json({citas});
    } catch (error) {
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
        res.status(500).send('Error en el servidor');
    }
}



