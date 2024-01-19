// "importamos biblioteca zeromq"
import * as zmq from "zeromq"
export class Cliente{
    
    constructor(urlEnvia, urlRecibe, nombre)
    {
        this.urlEnvia = urlEnvia
        this.urlRecibe = urlRecibe
        this.socketParaPedir = zmq.socket('req')
        this.socketParaRecibir = zmq.socket('sub')
        this.MI_NOMBRE=nombre
        this.connect()
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
    recibirMensaje(){
        this.socketParaPedir.on("message", function(respuesta) {
            console.log("cliente ", this.MI_NOMBRE + ": recibo respuesta " ,  ": [", respuesta.toString(), ']')
          
        }.bind(this))

        this.socketParaRecibir.on("message", function(topic, message) {
            console.log('Received message: ', message.toString());
          })
    }

   
    enviarMensaje (message){
        console.log("enviando mensaje ")
        this.socketParaPedir.send([message])
                
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