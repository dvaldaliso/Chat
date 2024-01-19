// "importamos biblioteca zeromq"
import * as zmq from "zeromq"
export class Servidor{
    constructor(urlRespuesta, urlDistribuye)
    {
        this.urlRespuesta = urlRespuesta
        this.urlDistribuye = urlDistribuye
        this.socketParaResponder = zmq.socket('rep')
        this.socketParaDistribuir = zmq.socket('pub')
        this.connect()
        this.recibirMensaje()
        this.close()
    }
    
    connect (){
        
        this.socketParaResponder.bind(this.urlRespuesta, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Listening ..."+this.urlRespuesta)
            }
	    }.bind(this))

        this.socketParaDistribuir.bind(this.urlDistribuye, function(err) {
        if(err)
            console.log(err)
        else
            console.log("Publishing on "+this.urlDistribuye)
        }.bind(this))



    }


    recibirMensaje() {
        
        this.socketParaResponder.on('message', function(message) {
            console.log("servidor recibo petición: "+" [", message.toString(), "]")
           
                this.responder()
                this.distribuye(message)
        }.bind(this)) 
    }
    
    responder(){
        if (this.socketParaResponder) 
                    this.socketParaResponder.send("enviado")
    }
    distribuye(message){
        this.socketParaDistribuir.send(['recibe',message])
    }

    close(){
        process.on('SIGINT', function() {
            console.log (" sigint capturada ! ")
            console.log (" hasta luego servidor! ")
            this.socketParaResponder.close()
            this.socketParaDistribuir.close()
            process.exit(0)
            // socketParaResponder = null
        }.bind(this))
    }
}