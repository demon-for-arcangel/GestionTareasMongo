requestAnimationFrame('dotenv').config()

const Serve = require('./server');

const server = new Serve();
server.listen();