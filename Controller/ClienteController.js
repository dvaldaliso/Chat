// "importamos biblioteca zeromq"
import * as zmq from "zeromq"
import Mensaje from "../Model/mensaje.js"
export class Cliente{
    
    constructor(urlEnvia, urlRecibe, nombre)
    {
        this.urlEnvia = urlEnvia
        this.urlRecibe = urlRecibe
        this.socketParaPedir = zmq.socket('req')
        this.socketParaRecibir = zmq.socket('sub')
        this.MI_NOMBRE=nombre
        this.connect()
        this.recibirConfirmacion()
        this.recibirMensaje()
        this.close()
    }
    
     /**
     * Connects to the server.
     *
     * @return {undefined} No return value.
     */
    connect (){
       console.log("Connecting to hello world server...")
       this.socketParaPedir.connect(this.urlEnvia)
       this.socketParaRecibir.connect(this.urlRecibe);
       this.socketParaRecibir.subscribe("recibe");
    }
    // ....................................................
    // cuando reciba respuestas
    
    recibirConfirmacion(){
        this.socketParaPedir.on("message", function(respuesta) {
            console.log("respuesta ",  respuesta.toString())
          
        }.bind(this))
    }
    recibirMensaje(){
       

        this.socketParaRecibir.on("message", function(topic, message) {
            let objectMessage = JSON.parse(message);

            console.log('Received message from : ', objectMessage.name, " mensaje :", objectMessage.message );
          })
    }

   /**
    * 
    * @param {string} message //hacer esto para todas las funciones
    */
    enviarMensaje (message){
        console.log("enviando mensaje ")
        let messageN=new Mensaje(this.MI_NOMBRE,message)
        var messageSend = JSON.stringify(messageN);
        this.socketParaPedir.send([messageSend])
                
    }
    close(){
        process.on('SIGINT', function() {
            console.log ( " ** SIGINT capturada: cerrando !! ** ")
            console.log ( " Bye "+this.MI_NOMBRE)
	        this.socketParaPedir.close()
            process.exit( 0 )
        }.bind(this))
    }
}