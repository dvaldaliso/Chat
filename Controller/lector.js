export class LectorTeclado {

	/**
	 * 
	 * @param {*} textoHaSidoLeido 
	 */
	constructor( textoHaSidoLeido ) {

		var stdin = process.openStdin()

		stdin.addListener ("data", 
						   function (datos) {
							   textoHaSidoLeido( datos.toString() ) 
						   }
						  );
	} 
} 