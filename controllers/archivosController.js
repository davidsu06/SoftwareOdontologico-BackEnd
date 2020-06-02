const path = require('path');
const fs = require('fs'); 

exports.guardarArchivo = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(500).send({ msg: "Archivo no encontrado" })
        }

        // accessing the file
        const myFile = req.files.file;
        
        // mv() method places the file inside public directory
        await myFile.mv(`${__dirname}/../media/${myFile.name}`, function (err) {
            if (err) {
                return res.status(500).send({ msg: "Hubo un error" });
            }

            // returing the response with file path and name
            return res.send({name: myFile.name, path: `/${myFile.name}`});
        });

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

exports.obtenerArchivo = async (req, res) => {
    try {
        await res.sendFile(path.join(`${__dirname}/../media/${req.params.name}`));
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

exports.eliminarArchivo = async (req, res) =>{
    try {

        await fs.stat(`${__dirname}/../media/${req.params.name}`, function (err) {
           
            if (err) {
                return console.error(err);
            }

            fs.unlink(`${__dirname}/../media/${req.params.name}`,function(err){
                if(err) return console.log(err);
                res.send({msg: 'Archivo Eliminado Correctamente'})
            });  
        });

    } catch (error) {
        res.send({msg: 'Hubo un error'})
    }
}

