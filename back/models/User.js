const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    email: {type: String, required:true, unique: true, trim: true},
    contrasena: {type: String, required: true, trim: true},
    rol: {type: String, enum: ['administrador', 'programador'], required: true},
    tareas: {type: mongoose.Schema.Types.ObjectId, ref: 'tareas'}
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('contrasena') || user.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.contrasena, salt);
            user.contrasena = hash;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.contrasena);
};

module.exports = mongoose.model('User', userSchema);