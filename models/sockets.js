
class Sockets {

    constructor( io ) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {

        this.io.on('connection', (socket) => {

            socket.on('mensaje-to-server', (data) => {
                console.log(data);
                // socket.emit('mensaje-form-server', data); // solo para emitir a la misma red 
                this.io.emit('mensaje-form-server', data); // para emitir a toda la red
            });

        });
    }

}

module.exports = Sockets;