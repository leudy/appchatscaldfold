var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {

        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    renderizarmensaje(mensaje, false);
    scrollBottom();
    //  console.log('Recibiendo desde el otro chat user', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listarPersonas', function(resp) {
    // var users = JSON.parse(resp);

    renderizarUsuarios(resp);

});
// extra method
socket.on('receiptmsj', function(msj) {
    renderizarmensaje(msj, false);
    scrollBottom();
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});