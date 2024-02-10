const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

class Server {
    constructor() {
        this.app = express();
        this.adminPath = '/api/admin';
        this.userPath = '/api/user';
        this.tareasPath = '/api/tareas';

        this.middlewares();
        this.conectarMongoose();
        this.routes();
    }

    conectarMongoose() {
        mongoose.connect('mongodb://' + process.env.DB_URL + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        this.db.once('open', () => {
            console.log('Conexión exitosa a MongoDB');
        });
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        const adminRoutes = require('../routes/adminRoutes');
        const userRoutes = require('../routes/userRoutes');
        const tareasRoutes = require('../routes/tareaRoutes');

        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.tareasPath, tareasRoutes);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        });
    }
}

module.exports = Server;
