const { io } = require('../server');
const { Usuarios } = require('../classes/Usuarios')
const { crearmensaje } = require('../utils/utils');

const ManageUsers = new Usuarios();

io.on('connection', (client) => {

    // recibiendo mensaje de chat
    client.on('entrarchat', (user, callback) => {

        if (!user.name || !user.sala) {
            return callback({ error: true, mensaje: 'El nombre es necesario' });
        }
        client.join(user.sala);
        let personas = ManageUsers.agregarPersona(client.id, user.name);
        let msj = crearmensaje('Admin', `${ user.name } entro el chat`);
        client.broadcast.to(user.sala).emit('listarPersonas', msj);
        callback(JSON.stringify(personas));
    });

    // borrar persona registrada via socket
    client.on('disconnect', () => {
        let _p = ManageUsers.borrarPersona(client.id);
        console.log(' persona que salio ', _p)
        client.broadcast.to(_p.sala).emit('crearMensaje', { usuer: 'Administrator', mensaje: `${ _p.name } salio el chat` });
        let ps = ManageUsers.getPersonasPorSala(_p.sala);
        client.broadcast.to(__dirname.sala).emit('listarPersonas', {
            ps
        })
    });

    // recibir un mensaje
    client.on('enviarMensaje', (msg) => {
        let _p = ManageUsers.getPersona(client.id);

        let msj = crearmensaje(_p.name, msg.msj);

        client.broadcast.to(_p.sala).emit('receiptmsj', msj)
    });

    client.on('PrivateMsj', (data) => {
        let person = ManageUsers.getPersona(client.id);
        client.broadcast.to(data.to).emit('PrivateMsj', crearmensaje(person.nombre, data.msj))

    })


});