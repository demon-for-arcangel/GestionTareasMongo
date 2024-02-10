const Tarea = require('../models/Tarea');

const TareaController = {
    getTareas: async (req, res) => {
        try {
            const tareas = await Tarea.find();
            res.json({ tareas });
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    }, 
    getTareaId: async (req, res) => {
        try {
            const { tareaId } = req.params;
            const tarea = await Tarea.findById(tareaId);
            if (!tarea){
                return res.status(404).json({ message: 'Tarea no encontrada.' });
            }
            res.json({ tarea });
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },
    insertTarea: async (req, res) => {
        try {
            const { descripcion, dificultad, tiempoEstimado } = req.body;

            const nuevaTarea = new Tarea ({
                descripcion,
                dificultad,
                tiempoEstimado
            });

            await nuevaTarea.save();
            res.status(201).json({ message: 'Tarea creada con éxito.', tarea: nuevaTarea });
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },
    updateTarea: async (req, res) => {
        try {
            const { tareaId } = req.params;
            const { descripcion, dificultad, tiempoEstimado } = req.body;

            const tarea = await Tarea.findById(tareaId);
            if (!tarea){
                return res.status(404).json({ message: 'Tarea no encontrada.' });
            }

            tarea.descripcion = descripcion || tarea.descripcion;
            tarea.dificultad = dificultad || tarea.dificultad;
            tarea.tiempoEstimado = tiempoEstimado || tarea.tiempoEstimado;

            await tarea.save();
            res.json({ message: 'Tarea actualizada con éxito.', tarea });
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    },
    deleteTarea: async (req, res) => {
        try {
            const { tareaId } = req.params;

            const tarea = await Tarea.findById(tareaId);
            if (!tarea){
                return res.status(404).json({ message: 'Tarea no encontrada.' });
            }

            await tarea.remove();
            res.json({ message: 'Tarea eliminada con éxito.'});
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor.' });
        }
    }
};

module.exports = TareaController;