const express = require('express');
const http    = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class server {
    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, { /* condiguracines*/ });
    }

    middleware() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }

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