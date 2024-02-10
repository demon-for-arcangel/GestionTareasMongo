const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token){
        return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
    }

    try{
        const decode = jwt.verify(token, SECRET_KEY);
        req.user = decode.user;
        next();
    }catch (error){
        return res.status(401).json({ messaje: 'Token no válido' });
    }
}

module.exports = authMiddleware;