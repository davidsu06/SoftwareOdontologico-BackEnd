const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');

//Creación del servidor
const app = express();

//Conexión DB
conectarDB();

//Habilitar cors
app.use(cors());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(express.json({ extended: true}));

const PORT = process.env.PORT || 4000;

// app.get('/',(req,res)=>{
//     res.send('Hola mundo')
// })


// Rutas
app.use('/api/pacientes', require('./routes/pacientes'));
app.use('/api/personal', require('./routes/personal'));
app.use('/api/citas', require('./routes/citas'));
app.use('/api/historias', require('./routes/historias'));
app.use('/api/facturas', require('./routes/facturas'));
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/tratamientos', require('./routes/tratamiento'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cloudinary', require('./routes/cloudinary'));

// Arrancar la app
app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`El servidor está corriedo en el puerto ${PORT}`);
});