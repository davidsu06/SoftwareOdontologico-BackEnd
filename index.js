const express = require('express');

//Creación del servidor
const app = express();

const PORT = process.env.PORT || 4000;

// app.get('/',(req,res)=>{
//     res.send('Hola mundo')
// })


app.listen(PORT,()=>{
    console.log(`El servidor está corriedo en el puerto ${PORT}`);
})