// jquery functions
var params = new URLSearchParams(window.location.search);




// referencias Jquery
var UserDiv = $('#divUsuarios');
var formtText = $('#formtext');
var txtMsj = $('#txtMsj');
var divChatbox = $('#divChatbox');


//properties
var nombre = params.get('nombre');
var sala = params.get('sala');

// renderizar el listado de usuarios
function renderizarUsuarios(personas) {
    console.log('personas ==>', personas)
    var html = '<li>  <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a> </li>';
    console.log(personas.length);
    console.log(personas);
    for (var i = 0; i < personas.length; i++) {
        html += '<li><a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a> </li>';
    }
    UserDiv.html(html);

}

function renderizarmensaje(msj, yo) {
    var fecha = new Date(msj.date);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var html = '';
    if (yo) {

        html += '<li class="reverse">';
        html += '<div class="chat-content">'
        html += '    <h5>' + msj.user + '</h5>'
        html += '    <div class="box bg-light-inverse">' + msj.msj + '</div>'
        html += '</div>'
        html += '<div class="chat-time">' + hora + '</div>'
        html += ' </li> ';

    } else {
        html += '<li class="animated fadeIn">';
        html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        html += '<div class="chat-content">'
        html += '    <h5>' + msj.user + '</h5>'
        html += '    <div class="box bg-light-info">' + msj.msj + '</div>'
        html += '</div>'
        html += '<div class="chat-time">' + hora + '</div>'
        html += ' </li> ';
    }
    divChatbox.append(html);
    scrollBottom();
}



// listeners
UserDiv.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {





        console.log(id)
    }
});

//listener whe user sent msj
formtText.on('submit', function(e) {
    e.preventDefault();
    if (txtMsj.val().trim().length == 0) return;

    socket.emit('enviarMensaje', { nombre: nombre, msj: txtMsj.val() }, function(response) {
        //console.log('msj form server', response);
        if (response) {
            console.log(response)
            txtMsj.val('').focus();
            renderizarmensaje(response, true);

        }
    });

}); {
    /* <li>
    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
    <div class="chat-content">
        <h5>James Anderson</h5>
        <div class="box bg-light-info">Lorem Ipsum is simply dummy text of the printing & type setting industry.</div>
    </div>
    <div class="chat-time">10:56 am</div>
    </li> */
}

function scrollBottom() {
    console.log('function onscroll ejecutada');
    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}