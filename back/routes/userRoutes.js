const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registro', UserController.registro);
router.post('/login', UserController.inicioSesion);
router.get('/getUsuario', authMiddleware, UserController.getUsuario);
router.put('/modificar-contrasena/:userId', authMiddleware, UserController.modificarContrasena);

module.exports = router;