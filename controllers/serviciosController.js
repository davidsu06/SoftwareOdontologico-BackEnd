const Servicios = require('../models/Servicios');
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

        // Guardar Servicio
        await servicio.save();
        res.send('servicio creado correctamente');
    } catch (error) {
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
        res.status(500).send('Hubo un error');
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
    const {nombre_servicio, precioTotal, cantidadCitas, imagen} = req.body;
    const nuevoServicio = {};

    if (nombre_servicio) {
        nuevoServicio.nombre_servicio = nombre_servicio;
    }

    if (precioTotal) {
        nuevoServicio.precioTotal = precioTotal;
    }

    if (cantidadCitas) {
        nuevoServicio.cantidadCitas = cantidadCitas;
    }

    if (cantidadCitas) {
        nuevoServicio.imagen = imagen;
    }

    try {
        // revisar el ID
        let servicio = await Servicios.findById(req.params.id);        

        // Si el servicio existe
        if (!servicio) {
            return res.status(404).json('Servicio no encontrado');
        }

        // Actualizar
        servicio = await Servicios.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoServicio}, {new: true});
        res.json({servicio});
    } catch (error) {
        res.status(500).send('Error en el servidor');  
    }
}

// Eliminar Servicio
exports.eliminarServicio = async (req, res) => {
    try {
        // revisar el ID
        let servicio = await Servicios.findById(req.params.id);        

        // Si el Servicio existe
        if (!servicio) {
            return res.status(404).json('Servicio no encontrado');
        }

        // Eliminar
        await Servicios.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Servicio eliminado'})
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}