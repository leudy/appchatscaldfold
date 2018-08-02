var socket = io();
var params = new URLSearchParams(window.location.search)
if (!params.has('name') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('el nombre y sala son necesario')

}

socket.on('connect', function() {
    // client 
    // var user = { name: params.get('name'), sala: params.get('sala') }
    socket.emit('entrarchat', { name: params.get('name'), sala: params.get('sala') }, function(res) {
        console.log(res)
    });


});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});
socket.on('crearMensaje', function(msg) {
    console.log('Servidor :=>', msg)
});
socket.on('listarPersonas', function(msg) {
    console.log('Servidor :', msg)
});
socket.on('receiptmsj', function(msj) {
    console.log(msj)
});

// Enviar información
// socket.emit('enviarMensaje', {
//     user: 'Fernando',
//     msj: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

socket.on('PrivateMsj', function(msj) {
    console.log(msj);
});