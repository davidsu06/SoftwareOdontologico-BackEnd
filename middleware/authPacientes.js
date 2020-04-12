const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    const token = req.header('x-auth-token');

    console.log(token);

    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido '});
    }

    try {    
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.paciente = cifrado.paciente;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }

}