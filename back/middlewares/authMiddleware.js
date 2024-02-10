const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers['x-token'];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        req.user = decoded;

        next();
    });
}

module.exports = authMiddleware;