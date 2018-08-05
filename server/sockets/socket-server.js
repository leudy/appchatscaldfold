const { io } = require('../server');
const { Usuarios } = require('../classes/Usuarios')
const { crearmensaje } = require('../utils/utils');

const ManageUsers = new Usuarios();

io.on('connection', (client) => {

    // recibiendo mensaje de chat

    client.on('entrarChat', (user, callback) => {

        if (!user.nombre || !user.sala) {
            return callback({ error: true, mensaje: 'El nombre es necesario' });
        }
        client.join(user.sala);
        let personas = ManageUsers.agregarPersona(client.id, user.nombre, user.sala);
        let msj = crearmensaje('Admin', `${ user.nombre } entro el chat`);
        client.broadcast.to(user.sala).emit('listarPersonas', msj);
        callback(personas);
    });

    // borrar persona registrada via socket
    client.on('disconnect', () => {
        let _p = ManageUsers.borrarPersona(client.id);
        console.log(' persona que salio ', _p);

        var mensaje = crearmensaje(_p.nombre, ` Administrator ${_p.nombre} salío del grupo`, _p.id)
        client.broadcast.to(_p.sala).emit('enviarMensaje', mensaje);

        console.clear();
        let ps = ManageUsers.getPersonasPorSala(_p.sala);
        console.log('las persona de la sala ' + _p.sala + ' son ', ps);
        client.broadcast.to(_p.sala).emit('listarPersonas', { ps });
    });

    // recibir un mensaje
    client.on('enviarMensaje', (msg, callback) => {
        console.log('recibiendo mensaje from webbrowser', msg)
        let _p = ManageUsers.getPersona(client.id);

        let msj = crearmensaje(_p.nombre, msg.msj, client.id);

        client.broadcast.to(_p.sala).emit('receiptmsj', msj)
        callback(msj)


    });

    client.on('PrivateMsj', (data) => {
        let person = ManageUsers.getPersona(client.id);
        client.broadcast.to(data.to).emit('PrivateMsj',
            crearmensaje(person.nombre, data.msj))

    })


});