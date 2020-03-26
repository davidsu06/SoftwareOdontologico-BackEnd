const express = require('express');
const conectarDB = require('./config/db');

//Creación del servidor
const app = express();

//Conexión DB
conectarDB();

const PORT = process.env.PORT || 4000;

// app.get('/',(req,res)=>{
//     res.send('Hola mundo')
// })


app.listen(PORT,()=>{
    console.log(`El servidor está corriedo en el puerto ${PORT}`);
})