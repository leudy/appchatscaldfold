class Usuarios {
    constructor() {
        this.personas = [];
    }
    agregarPersona(id, name, sala) {

        let persona = { id, nombre: name, sala };
        this.personas.push(persona);
        return this.getPersonasPorSala(sala);
    }
    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }
    getPersonas() { return this.personas; }
    getPersonasPorSala(sala) {
        let pOnRoom = this.personas.filter(persona => persona.sala === sala);
        return pOnRoom;
    }

    borrarPersona(id) {
        let persona = this.getPersona(id);
        //console.log('persona del listado filtrado', persona)
        this.personas = this.personas.filter(p => p.id !== id);
        //console.log('la persoan selecionada es ', persona)
        return persona;
    }
}

module.exports = { Usuarios }