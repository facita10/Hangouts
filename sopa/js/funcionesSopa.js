var sopa = [];
var respuestas = new Array ();
var revisarRes = new Array ();
var seleccionados = ["--->"];
var numPalabras=0;
var aciertos=0;


//***********************************+//
//Esta variable es un arreglo con número de la preguntas/palabras que ya se encontraron en la sopa de letras
//Utilizala para saber que botón desactivas o le cambias el estilo para indicar que esa pregunta ya esta conectada
var preguntasContestadas = new Array();
//*****************************************************+//

$(document).on('ready', function(){
	
	palabra = "EjemplomasT";
	creaSopa(sopa);

	mrespuestas(respuestas);
	

	//*****************************************************+//
	//AQUI METER LAS 10 PALABRAS EXTRAIDAS DE LA BD
	//Es muy importante validar que las palabras no contengan mas de 13 letras , ya que no cabrian verticalmente y cuasaría errores
	//Mete las palabras en MAYUSCULAS, ya que así se generan las letras aleatorias de relleno y además se ve mejor.


	acomodaPalabras(sopa, respuestas, "ABECEDARIO");
	acomodaPalabras(sopa, respuestas, "BANQUERO");
	acomodaPalabras(sopa, respuestas, "GIRATORIO");
	acomodaPalabras(sopa, respuestas, "LIMITADAMENTE");
	acomodaPalabras(sopa, respuestas, "REAPARECER");
	acomodaPalabras(sopa, respuestas, "LUMINICENCIA");
	acomodaPalabras(sopa, respuestas, "SEMILLA");
	acomodaPalabras(sopa, respuestas, "MAPA");
	acomodaPalabras(sopa, respuestas, "EDGAR");
	acomodaPalabras(sopa, respuestas, "PULSO");
	
	//*****************************************************+//

	//Comenta esta función si sólo quieres ver las 10 palabras que están dentro de la sopa de letras
	rellena(sopa);



	dibujaSopa(sopa);

	
	rr="";
	ar = new Array();
	for (i =0; i < 10; i++){
		
			//respuestas[i][j] = "*";
			rr += "pos pal " + i.toString()+ ": ";
			ar = respuestas[i][1];
			for(k=0; k < ar.length; k++){
				rr += ar[k] + " ";
			}
			rr += "---";
		

		
	}
	//alert (rr);

	//CargaPreguntas();
	//SOPA DE LETRAS
});

function mrespuestas(respuestas){
	
	
	for (i = 0; i < 10; i++) {
			respuestas[i] = "*";
	};	
	
	
}




//Función que genera letras aleatorias para rellenar la sopa de letras
function rellena(sopa){
	abc = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	for (i = 0; i < 13; i++) {
		for (j = 0; j <20; j++) {
			if (sopa[i][j] == "*") {
				ram = aleatorio (0,26);
				sopa[i][j] = abc.charAt(ram);
			}
			
		}
	}			
}



//Función que dibuja la sopa de letras completa en la página html
function dibujaSopa(sopa){
	laSopa = "";
	for (i = 0; i < 13; i++) {
		for (j = 0; j <20; j++) {
		laSopa += "<li><a id='"+(i.toString())+"_"+(j.toString())+"'>"+sopa[i][j]+"</a></li>";		
		};
	}			
	$("#letras").append(laSopa);
	$("#letras li a").on("click", function(){
		
		
		validaPalabra($(this));
	});
}

//Función que se manda a llamar cada que das clic a una letra.  Verifica que la letra pertenezca a una palabra
function validaPalabra(ob){
	ob.addClass("Usado");
	$("#letras li a").each(function () {
		
		for (j = 0; j < 10; j ++) {
        	revisarRes[j] = respuestas[j][1];

        }
        tmp="";
        for (var i = 0; i < revisarRes.length; i++) {
        	for (var j = 0; j < revisarRes[i].length; j++) {
        		tmp += revisarRes[i][j] +" ";
        	};
        	tmp += "\n";
        };
        tmp +=	"";
        //console.log(tmp);
		if ($(this).hasClass('Usado')) {
			
			elid = $(this).attr("id");
            esta = true;
             	
         	//Verificar si ya estaba seleccionada
         	busca:
	 		for ( i = 0; i < seleccionados.length; i++) {
         		if ( seleccionados[i] == elid  ) {
         			
         			esta = true;
         			break busca;
         			
         		}
         		else{
         			//console.log("listo para meterlo");         			
         			esta = false ;
         			//Las pocisiones de las respuestas
         	
         		}	
         	}
         	
            if (!esta) {
    			
    			seleccionados.push(elid);

    			cc= new Array(10);
    			cc[0]=0;
    			cc[1]=0;
    			cc[2]=0;
    			cc[3]=0;
    			cc[4]=0;
    			cc[5]=0;
    			cc[6]=0;
    			cc[7]=0;
    			cc[8]=0;
    			cc[9]=0;
    			
    			
    			for (var i = 1; i < seleccionados.length; i++) {

    				for (var j = 0; j < revisarRes.length; j++) {
    					
    					for (var k = 0; k < revisarRes[j].length; k++) {
    						if (seleccionados[i] == revisarRes[j][k]){
    							cc[j] = cc[j] + 1;
    							console.log("Letra correcta");
    							console.log("contador palabra " +j+": "+cc[j]);
    							if (cc[j] == revisarRes[j].length) {
    								console.log("PALABRA ENCONTRADA");
    								aciertos ++;
    								

    								preguntasContestadas.push(respuestas[j][0]);

    								for (var i = 0; i < preguntasContestadas.length; i++) {
    									//alert ( preguntasContestadas[i]);
    								};
    								

    								for (var l = 0; l < revisarRes[j].length; l++) {
    									console.log("tamaño palabra "+ j+": "+revisarRes[j].length);
    									$('#' + revisarRes[j][l].toString()).removeClass();
             							$('#' + revisarRes[j][l].toString()).addClass("Bien");
             							posBorrar= seleccionados.indexOf(revisarRes[j][l].toString());
										seleccionados.splice(posBorrar, 1);

    								};
    								
    								for (var p = 1; p < seleccionados.length; p++) {
											//$('#' + seleccionados[i].toString()).removeClass(); 
										$('#' + seleccionados[p].toString()).removeClass();
             							
									};
									seleccionados.splice(1, seleccionados.length);
									console.log("aun quedan: "+seleccionados.length -1);
									cc[j]=0;

									selec="";
									for (var f=0 ; f < seleccionados.length;f++) {
										selec += seleccionados[i]+ " ";
									}
									console.log("CLICKEADOS: " + selec);

									if (aciertos==10) {
										alert("felicidades has descubierto todas las palabras");
									};	
									
    							}
    						}
    						else{
    							//cc[j]=0;
    						}
    					};
    				};
    			};
    			
			}// IF - el id no estaba en los seleccionados						
             
        }// Tiene la clase Usado
    }); //Each
	selec="";
	for (i=0 ; i < seleccionados.length;i++) {
		selec += seleccionados[i]+ " ";
	}
	console.log("CLICKEADOS: " + selec);
}

function creaSopa(sopa){ 
	
	laSopa = "";
	for (i = 0; i < 13 ; i++) {
		sopa[i] = [20];
	}
	for (i = 0; i < 13; i++) {
		for ( j = 0; j < 20; j++) {
			sopa[i][j] = "*";
		};
	};	
}

function aleatorio(inferior,superior){ 
    numPosibilidades = superior - inferior 
    aleat = Math.random() * numPosibilidades 
    aleat = Math.floor(aleat) 
    return parseInt(inferior) + aleat 
} 




//Funcion que acomoda las palabras de 4 formas distintas aleatorias en un arreglo
function acomodaPalabras(sopa, respuestas, palabra){ 
	lon = palabra.length;
	cabe = false;
	acomodada = false ;
	
	
	do{
		tipo = aleatorio(1,5);
		if (lon>8) {
			tipo = aleatorio(1,3);	
		}
		else{
			tipo = aleatorio(1,5);
		}

		//tipo = 4;
		switch(tipo){
			
			//Tipo "1" es para palabras verticales de arriba hacia abajo
			case 1: 
			
				do{
					pos_v = aleatorio(0,(14 - lon));
					pos_h = aleatorio(0,20);
					numbn= false;
					if( (pos_v >= 0) && (pos_v <= 12) && (pos_h >=0)&& (pos_h <=19) ){
						numbn= true;	
					}
				}while(numbn != true);
				
				//console.log(" pos_v "+pos_v);	
				//console.log(" pos_h "+pos_h);	

				for (i = 0; i < lon; i++) {
					
					if (sopa[(pos_v )+ (i)][pos_h] != "*") {
						cabe = false;
						break;
					}
					else{
						cabe= true;
					}
				}

				if (cabe) {
					acomodada = true;
					numPalabras = numPalabras + 1;
					pos = new Array(lon);
					for (i=0; i < lon ; i++) { 
						sopa[(pos_v)+(i)][pos_h] = palabra.charAt(i);

						pos[i]=(pos_v+i).toString() +"_"+ pos_h.toString();

					}


					res:
						for (j = 0; j < 10; j++) {
							if (respuestas[j]=="*" ){
								//alert("res vacia");

								respuestas[j]= new Array(2);
								respuestas[j][0] = numPalabras ;
								respuestas[j][1] = pos ;
								
								break res;	
							}
							else{
								//alert("no esta vacia");
							}	
						}
				}		
				else{
					acomodada =false;
					
				}
			
			break;
			case 2: 
				//Tipo "2" es para palabras verticales de abajo hacia arriba
				do{
					pos_v = aleatorio(0,(14 - lon));
					pos_h = aleatorio(0,20);
					numbn= false;
					if( (pos_v >= 0) && (pos_v <= 12) && (pos_h >=0)&& (pos_h <=19) ){
						numbn= true;	
					}
				}while(numbn != true);
				
				for (i = 0; i < lon; i++) {
					
					if (sopa[(pos_v )+ (i)][pos_h] != "*") {
						cabe = false;
						break;
					}
					else{
						cabe= true;
					}
				}

				if (cabe) {
					acomodada = true;
					numPalabras = numPalabras + 1;
					pos = new Array(lon);
					for (i=0; i < lon ; i++) { 
						
						sopa[(pos_v)+(i)][pos_h] = palabra.charAt((lon-1)-i);

						pos[i]=(pos_v+i).toString() +"_"+ pos_h.toString();

					}


					res:
						for (j = 0; j < 10; j++) {
							if (respuestas[j]=="*" ){
								//alert("res vacia");

								respuestas[j]= new Array(2);
								respuestas[j][0] = numPalabras ;
								respuestas[j][1] = pos ;
								
								break res;	
							}
							else{
								//alert("no esta vacia");
							}	
						}
				}		
				else{
					acomodada =false;
					
				}
			break;
			
			case 3: 
				//Tipo "3" es para palabras horizontales de izq a derecha
				do{
					pos_v = aleatorio(0,14);
					pos_h = aleatorio(0,(20-lon));
					numbn= false;
					if( (pos_v >= 0) && (pos_v <= 12) && (pos_h >=0)&& (pos_h <=19) ){
						numbn= true;	
					}
				}while(numbn != true);


				verifica:
				for (i = 0; i < lon; i++) {
					veces= 0 ;	
					if (sopa[pos_v][(pos_h) + (i)] != "*") {
						cabe = false;
						break verifica;
					}
					cabe = true;
					
				}
				
				if (cabe) {
					acomodada = true;
					numPalabras = numPalabras + 1;
					pos = new Array(lon);
					for (i=0; i < lon ; i++) { 
						sopa[pos_v][(pos_h)+(i)] = palabra.charAt(i);
						pos[i]=pos_v.toString() +"_"+ (pos_h+i).toString();
						
					}
					
					res:
					for (j = 0; j < 10; j++) {
						if (respuestas[j]=="*" ){
								//alert("res vacia");
								respuestas[j]= new Array(2);
								respuestas[j][0] = numPalabras ;
								respuestas[j][1] = pos ;
								
								break res;	
							}
							else{
								//alert("no esta vacia");
							}	
						}
				}		
				else{
					acomodada =false;
					
				}

			
			break;
			case 4: 
				
				//Tipo "3" es para palabras horizontales de izq a derecha
				do{
					pos_v = aleatorio(0,14);
					pos_h = aleatorio(0,(20-lon));
					numbn= false;
					if( (pos_v >= 0) && (pos_v <= 12) && (pos_h >=0)&& (pos_h <=19) ){
						numbn= true;	
					}
				}while(numbn != true);


				verifica:
				for (i = 0; i < lon; i++) {
					veces= 0 ;	
					if (sopa[pos_v][(pos_h) + (i)] != "*") {
						cabe = false;
						break verifica;
					}
					cabe = true;
					
				}
				
				if (cabe) {
					acomodada = true;
					numPalabras = numPalabras + 1;
					pos = new Array(lon);
					for (i=0; i < lon ; i++) { 
						sopa[pos_v][(pos_h)+(i)] = palabra.charAt((lon-1)-i);
						pos[i]=pos_v.toString() +"_"+ (pos_h+i).toString();
						
					}
					
					res:
					for (j = 0; j < 10; j++) {
						if (respuestas[j]=="*" ){
								//alert("res vacia");
								respuestas[j]= new Array(2);
								respuestas[j][0] = numPalabras ;
								respuestas[j][1] = pos ;
								
								break res;	
							}
							else{
								//alert("no esta vacia");
							}	
						}
				}		
				else{
					acomodada =false;
					
				}

			
			break;



		default:
			alert ("fue default " + tipo);
			acomodada =false;
		
	}
		
	}while(acomodada != true);

	
}
