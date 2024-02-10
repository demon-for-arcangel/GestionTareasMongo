const User = require('..models/User');
const Tarea = require('../models/Tarea');
const asignacionTareas = require('../utils/AlgoritmoAsignacionTarea');

const AdminController = {
    getRanking: async (req, res) => {
        try {
            const topProgramadores = await User.find({ rol: 'programador' })
                .sort({ 'tareas.length': -1 })
                .limit(10);

            res.json({ topProgramadores });
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },

    getTareasCompletadas: async (req, res) => {
        try{
            const tareasCompletas = await Tarea.find({ completado: true });
            res.json({ tareasCompletas });
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },

    getTareasIncompletas: async (req, res) => {
        try{
            const tareasPendientes = await Tarea.find({ completado: false });
            res.json({ tareasPendientes });
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },

    getTareasProgramador: async (req, res) => {
        try{
            const { userId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrador' });
            }

            const tareasProgramador = await Tarea.find({ asignado: userId });
            res.json({ tareasProgramador });
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },

    asignarTareaAlMejor: async (req, res) => {
        try {
            const { dificultad, tiempoEstimado, descripcion } = req.body;
            const programadores = await User.find({ rol: 'programador' });

            const mejorProgramador = asignacionTareas(programadores, dificultad, tiempoEstimado);
            const nuevaTarea = new Tarea({
                descripcion,
                dificultad,
                tiempoEstimado,
                asignado: mejorProgramador._id,
            });

            await nuevaTarea.save();
            res.json({ message: 'Tarea asignada con éxito.', asignado: mejorProgramador })
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    }
}

module.exports = AdminController;