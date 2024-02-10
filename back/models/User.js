const mongoose = require('mongoose');
const bycript = require('bycript');

const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true, trim: true},
    email: {type: String, required:true, unique: true, trim: true},
    contrasena: {type: String, required: true, trim: true},
    rol: {type: String, enum: ['administrador', 'programador'], required: true},
    tareas: {type: mongoose.Schema.Types.ObjectId, ref: 'tareas'}
})

userSchema.pre('save', async function (next){
    const user = this;
    if (user.isModified('password') || user.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        }catch (error){
            return next(error);
        }
    }else{
        return next();
    }
});

userSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);