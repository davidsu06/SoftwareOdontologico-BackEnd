const Factura = require('../models/Facturas');
const Paciente = require('../models/Paciente');
const Personal = require('../models/Personal');
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

// Modificar estado de la factura
exports.modificarEstadoFactura = async (req,res) =>{
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer la informacion del proyecto
    const { documento_paciente, nombre_paciente, valor, fecha, documento_cajero, nombre_cajero, estado } = req.body;
    const nuevaFactura = {};

    if(documento_paciente && nombre_paciente){
        let paciente = await Paciente.findOne({ documento_paciente });
        
        if (paciente) {
            return res.status(404).json({ msg: 'Paciente no encontrado'});
        }
        nuevaFactura.documento_paciente = documento_paciente;
        nuevaFactura.nombre_paciente = nombre_paciente;
    }

    if(valor){
        nuevaFactura.valor = valor;
    }

    if(fecha){
        nuevaFactura.fecha = fecha;
    }

    if(documento_cajero && nombre_cajero){
        let personal = await Personal.findOne({ documento_cajero });
        
        if (personal) {
            return res.status(404).json({ msg: 'Personal no encontrado'});
        }
        nuevaFactura.documento_cajero = documento_cajero;
        nuevaFactura.nombre_cajero = nombre_cajero;
    }

    if(estado){
        nuevaFactura.estado = estado;
    }

    try {
        // revisar el ID
        let factura = await Factura.findById(req.params.id);       

        // Si la Historia Clínca no existe
        if (!factura) {
            return res.status(404).json('Factura no encontrada');
        }

        // Actualizar
        factura = await Factura.findByIdAndUpdate({_id: req.params.id}, {$set: nuevaFactura}, {new: true});
        res.json({factura});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }
}