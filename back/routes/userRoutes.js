const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registro', UserController.registro);
router.post('/login', UserController.inicioSesion);
router.get('/getUsuario', authMiddleware, UserController.getUsuario);
router.put('/modificar-contrasena/:userId', authMiddleware, UserController.modificarContrasena);
//puede ver el listado de tareas disponibles y puede asignarsela o quitarsela
router.get('/tareas-incompletas', authMiddleware, AdminController.getTareasIncompletas);
//consultar sus tareas
//indicar porcentaje de desarrollo o marcarla como completa
//consultar las tareas del proyecto al completo esto es mostrar las tareas libres y las que no son libres
//cambiar su foto de perfil

module.exports = router;