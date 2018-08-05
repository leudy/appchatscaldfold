const crearmensaje = (user, msj, userid = '') => {
    return { userid, user, msj, date: new Date().getTime() };
}

module.exports = { crearmensaje }