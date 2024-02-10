const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/ranking', authMiddleware, AdminController.getRanking);
router.get('/tareas-realizadas', authMiddleware, AdminController.getTareasCompletadas);
router.get('/tareas-incompletas', authMiddleware, AdminController.getTareasIncompletas);
router.get('/tareas-programador/:userId', authMiddleware, AdminController.getTareasProgramador);
router.post('/asignar-tarea', authMiddleware, AdminController.asignarTareaAlMejor);

//crearUsuario, eliminarUsuario y modificarUsuario
//gestionar tareas (altas, bajas y modificaciones y asignaciones)
//gestionar roles de usuarios
//consulta del ranking (comprobar si funciona)

module.exports = router;