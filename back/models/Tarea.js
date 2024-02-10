const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    descripcion: {type: String, required: true},
    dificultad: {type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true},
    tiempoEstimado: {type: Number, required: true},
    tiempoActual: {type: Number, default: 0},
    porcentajeRealizado: {type: Number, default: 0},
    completado: {type: Boolean, default: false},
    asignado: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Tarea', tareaSchema);