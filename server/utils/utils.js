const crearmensaje = (user, msj) => {
    return { user, msj, date: new Date().getTime() };
}

module.exports = { crearmensaje }