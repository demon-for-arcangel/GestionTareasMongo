const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env; // Se corrige la obtención de SECRET_KEY

const UserController = {
    registro: async (req, res) => {
        try {
            const { nombre, email, contrasena, rol } = req.body;

            const existe = await User.findOne({ email });
            if (existe){
                return res.status(400).json({ message: 'El correo electrónico ya existe.' });
            }

            const nuevo = new User({ nombre, email, contrasena, rol });
            await nuevo.save();

            res.status(201).json({ user: nuevo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    inicioSesion: async (req, res) => {
        try {
            const { email, contrasena } = req.body;

            const user = await User.findOne({ email });
            if (!user){
                return res.status(401).json({ message: 'Correo electrónico incorrecto.' });
            }

            const verificar = await user.comparePassword(contrasena);
            if (!verificar){
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = generarJWT({ user }, JWT_SECRET);
            res.json({ token, user });
        } catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },

    getUsuario: async (req, res) => {
        try {
            const { user } = req;
            res.json({ user });
        } catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    modificarContrasena: async (req, res) => {
        try {
            const { userId } = req.params; 
            const { antiguaContrasena, nuevaContrasena } = req.body;
    
            const user = await User.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
    
            const verificar = await user.comparePassword(antiguaContrasena);
            if (!verificar) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
    
            user.contrasena = nuevaContrasena;
            await user.save();
    
            res.json({ message: 'Contraseña actualizada con éxito.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    }
}

module.exports = UserController;
