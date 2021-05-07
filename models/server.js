const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, { /* condiguracines*/ });
    }

    middleware() {
        // Desplegar el direcctorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // app CORS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });
    }

    // Esta configuración se puede tener aqui  o como propiedad de clase
    // Depende mucho de lo que necesites
    configureSockets() {
        new Sockets(this.io);
    }

    execute() {

        // Inicializar middlewares
        this.middleware();

        // Inicializar sockets
        this.configureSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log('Servidor conrriendo en el puerto:' + this.port);
        });
    }
}

module.exports = server;