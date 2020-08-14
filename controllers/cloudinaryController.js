var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dibu3geyp', 
    api_key: '588615657265518', 
    api_secret: 'iK--dWYgcBT3ndMpHyr06iWd8PM' 
});

exports.guardarArchivo = async (req, res) => {
    try {
        if (!req.files && !req.body) {
            return res.status(500).send({ msg: "Archivo no encontrado" })
        }

        let image;

        if(req.files){
            image = req.files.file;
        }
        else{
            image = req.body
        }
        
        await cloudinary.uploader.upload(image.tempFilePath || `data:${image.type}/${image.format};base64,${image.base64}`, function(error, result) {
            if(result){
                return res.json({result})
            }
            else{
                return res.json({error})
            }
        }).catch(error => console.log(error));
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
}

exports.eliminarArchivo = async (req, res) =>{
    try {
        await cloudinary.uploader.destroy(req.query.public_id, function(error, result) {
            if(result){
                return res.json({result})
            }
            else{
                return res.json({error})
            }
        }).catch(error => console.log(error));

    } catch (error) {
        res.send({msg: 'Hubo un error'})
    }
}

