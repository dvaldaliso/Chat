
// ....................................................
// este cliente envía de golpe todos los mensajes al servidor
// (no debería hacerse así)
// ....................................................

import { Cliente } from "./Controller/ClienteController.js"
import { LectorTeclado } from "./Controller/lector.js"
 
function main () {
    let nombre = (process.argv[2] ? process.argv[2]  : "noname")
	var chat = new Cliente("tcp://localhost:5556","tcp://localhost:5552", nombre)

    var lector = new LectorTeclado( function(leido){
        chat.enviarMensaje(leido)
    })
}
main()