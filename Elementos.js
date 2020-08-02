var tableroInfo = new Array()
var piezas = new Array()

//piezas
function cargarPiezas(){
	tableroInfo[0]={co:'2'}
	piezas.push({pImagen: '\u265F', pieza: "P"}) //peon
	piezas.push({pImagen: '\u265C', pieza: "T"}) //tore
	piezas.push({pImagen: '\u265E', pieza: "C"}) //caballo
	piezas.push({pImagen: '\u265D', pieza: "A"}) //alfil
	piezas.push({pImagen: '\u265B', pieza: "D"}) //reina
	piezas.push({pImagen: '\u265A', pieza: "R"}) //rey
	piezas.push({pImagen: '\u265D', pieza: "A"})//alfil
	piezas.push({pImagen: '\u265E', pieza: "C"})//Caballo
	piezas.push({pImagen: '\u265C', pieza: "T"}) //torre
	
	//cargamos un tableroinfo inicial con datos null
	for(x = 0;x<64;x++){
			tableroInfo[x]=({pImagen: null,pieza: null, color: null})
	}

	//rellenamos el tablero con las piezas, tabien rellenamos tableroinfo con las piezas
	for(x=0;x<8;x++){		
		document.getElementById("celda"+"0"+x).innerHTML = piezas[x+1].pImagen.fontcolor("#0B0A0A")
			tableroInfo[x].pImagen=piezas[x+1].pImagen
			tableroInfo[x].pieza=piezas[x+1].pieza
			tableroInfo[x].color='N'
		
			document.getElementById("celda"+"1"+x).innerHTML = piezas[0].pImagen.fontcolor("#0B0A0A")
			tableroInfo[1*8+x].pImagen=piezas[0].pImagen
			tableroInfo[1*8+x].pieza=piezas[0].pieza
			tableroInfo[1*8+x].color='N'
		
		document.getElementById("celda"+"6"+x).innerHTML = piezas[0].pImagen.fontcolor("#FFFFFF")
			tableroInfo[6*8+x].pImagen=piezas[0].pImagen
			tableroInfo[6*8+x].pieza=piezas[0].pieza
			tableroInfo[6*8+x].color='B'
			
		document.getElementById("celda"+"7"+x).innerHTML = piezas[x+1].pImagen.fontcolor("#FFFFFF")
			tableroInfo[7*8+x].pImagen=piezas[x+1].pImagen
			tableroInfo[7*8+x].pieza=piezas[x+1].pieza
			tableroInfo[7*8+x].color='B'
}

}
function iniciar(){
	var capa = document.getElementById("dom")
	var tablero = document.createElement("table")
	var body = document.createElement("tbody")

	var td //column
	var tr //row
	var refcolor=true //referencia para ir cambiando el color del tablero y que queden intercalados
	var color
	
	//dibujamos el tablero
	for(x=0;x<8;x++){
		tr=document.createElement("tr")
				
		refcolor=!refcolor
		for (y=0;y<8;y++){
			if(refcolor==true){
				color="rgb(100,100,100)"
				refcolor=false
			}
			else{
				color="rgb(200,200,200)"	
				refcolor=true
			}
			td=document.createElement("td")
			td.id="celda"+x+y

			tr.appendChild(td)
			td.style.width=60+"px" // ancho de las celdas
			td.style.backgroundColor=color

		}
		body.appendChild(tr)
		tr.style.height=60+"px"//en esta parte definimos la altura de las filas
	}
	tablero.appendChild(body)
	capa.appendChild(tablero)
	tablero.className="TableroAjedrez"
	
	document.getElementsByClassName("TableroAjedrez")[0].addEventListener("click", selCelda,false)
	cargarPiezas()
}

var piezaSel = new Array()
piezaSel.push({pImagen: null, pieza: null, color:null, fil: null, col: null})

var movAccion="seleccionar"
function selCelda(){
	//debugger
	//1.obtenemos lasc oordenadas de ubicacion del tablero
	 ytop=document.getElementsByClassName("TableroAjedrez")[0].offsetTop
	 xleft=document.getElementsByClassName("TableroAjedrez")[0].offsetLeft
	 //2.obtenemos las coordenadas x e y del raton dentro del div
	 xx=event.clientX
	 yy=event.clientY
	 //3.mostramos las coordenadas esto debemos odificar para el tamaño de la tabla
	 x=parseInt((xx-xleft)/(50));//horizontal
	 y=parseInt((yy-ytop)/(60));//vertical
	 //mostramos cordenadas en la pantalla
	 document.getElementById("xx").value=y
	 document.getElementById("yy").value=x
	 document.getElementById("info").value=tableroInfo[y*8+x].pImagen+ tableroInfo[y*8+x].pieza + tableroInfo[y*8+x].color
	
	 //Buscamos dentro de tablero info que es donde estan las fichas si en esa posicion hay algo
	if (movAccion=="seleccionar"){
		
		piezaSel[0].pImagen=tableroInfo[y*8+x].pImagen
		piezaSel[0].pieza=tableroInfo[y*8+x].pieza
		piezaSel[0].color=tableroInfo[y*8+x].color
		piezaSel[0].fil=y
		piezaSel[0].col=x
		if(tableroInfo[y*8+x].pieza!=null){
		movAccion="mover"
		}

	}
	else if(movAccion=="mover"){
		if(piezaSel[0].color==tableroInfo[y*8+x].color){//solo se vuelve a seleccionar optra pieza del mismo color
			piezaSel[0].pImagen=tableroInfo[y*8+x].pImagen
			piezaSel[0].pieza=tableroInfo[y*8+x].pieza
			piezaSel[0].color=tableroInfo[y*8+x].color
			piezaSel[0].fil=y
			piezaSel[0].col=x					
		}else{
			if(valido(piezaSel[0].fil, piezaSel[0].col, piezaSel[0].pieza,piezaSel[0].color, y, x,tableroInfo[y*8+x].pieza,tableroInfo[y*8+x].color)){
				movAccion="seleccionar"
				moverPieza(piezaSel[0].fil,piezaSel[0].col,y,x)
			}else{
				//alert(movAccion+","+"jugada invalida")
			}
		}

	}
}
function valido(fili,coli,piezai,colori,filf,colf,piezaf,colorf){
	//1. jugada valida para los peones
	if (piezai=='P'){
		if(coli==colf){
			var maxmov; //movimiento maximos permitidos
			var incrFil=0; //signo del incremento
			var incrCol=0; //signo del incremento
			var xmax; //casillas maximas a desplazarse
			var cInicial;//casilla inicial
			var dir;//direccion de movimiento NOTA: los peones son las unicas piezas que no puede retroceder
			xmax=Math.abs(filf-fili);
			incrFil=(filf-fili)/xmax;
			if(colori=='B') {
				cInicial=6;
				dir=-1;
			}
			if(colori=='N')	{
				cInicial=1;
				dir=1;
			}
			if(fili==cInicial && xmax>0 && xmax<=2 && incrFil==dir) maxmov=2;
			else if(xmax==1 && dir==incrFil) maxmov=1;
			else maxmov=0;
			if (maxmov>0){
				if (VerIntermedios(fili,coli,incrFil,incrCol,maxmov)) return true;
				else return false;
			}
			else return false;
			
		}
		else{
			//verificamos si tiene la posibilidad de tomar una pieza
			if(colori=='B'){
				//aqui debemos agragar el codigo para detectar el jaque
				if(fili-filf==1 && Math.abs(colf-coli)==1 && colori!=colorf && piezaf!=null) return true; //tomar pieza
				else return false;
			}
			if(colori=='N'){
				if(fili-filf==-1 && Math.abs(colf-coli)==1 && colori!=colorf && piezaf!=null) return true; //tomar pieza
				else return false;
			}
		}
	}
	//2. jugada valida para las torres
	if (piezai=='T'){
		if(coli==colf || fili==filf){
			var incrCol;
			var incrFil;
			var xmax;
			xmax=Math.abs(Math.abs(colf-coli) - Math.abs(filf-fili));
			incrCol=(colf-coli)/xmax;
			incrFil=(filf-fili)/xmax;
			if (VerIntermedios(fili,coli,incrFil,incrCol,xmax-1)) {
				if (verCaptura(fili,coli,incrFil,incrCol,xmax)) return true;
				else return false;
			}
			else return false;
		}else return false;
	}
	//3. jugada valida para el Caballo
	if (piezai=='C'){
		if(Math.abs(coli-colf)==1 && Math.abs(fili-filf)==2){
			if(tableroInfo[filf*8+colf].pieza==null) return true//solo se mueve la pieza
			else if(tableroInfo[filf*8+colf].color!=piezaSel[0].color) return true //se captura la pieza
				 else return false
		}
		else 
			if (Math.abs(coli-colf)==2 && Math.abs(fili-filf)==1){
				if(tableroInfo[filf*8+colf].pieza==null) return true
				else if(tableroInfo[filf*8+colf].color!=piezaSel[0].color)return true //se captura la pieza
					else return false
			}
			else return false
	}
	//4. jugada valida para la Dama
	if (piezai=='D'){
		var incrCol;
		var incrFil;
		var xmax;
		if(coli==colf || fili==filf){//movimiento tipo torre
			xmax=Math.abs(Math.abs(colf-coli) - Math.abs(filf-fili));
			incrCol=(colf-coli)/xmax;
			incrFil=(filf-fili)/xmax;
			if (VerIntermedios(fili,coli,incrFil,incrCol,xmax-1)) {
				if (verCaptura(fili,coli,incrFil,incrCol,xmax)) return true;
				else return false;
			}
			else return false;
		}
		else {//movimiento tipo alfil
			if (Math.abs(fili-filf)==Math.abs(coli-colf)){//solo permite movimientos diagonales
				xmax=Math.abs(colf-coli);
				incrCol=(colf-coli)/xmax;
				incrFil=(filf-fili)/xmax;
				if (VerIntermedios(fili,coli,incrFil,incrCol,xmax-1)) {
				if (verCaptura(fili,coli,incrFil,incrCol,xmax)) return true;
				else return false;
			}
				else return false;
			}
		}
	}
	//5. jugada valida para alfiles
	if (piezai=='A'){
		if (Math.abs(fili-filf)==Math.abs(coli-colf)){//solo permite movimientos diagonales
			var incrCol;
			var incrFil;
			var xmax;
			xmax=Math.abs(colf-coli);
			incrCol=(colf-coli)/xmax;
			incrFil=(filf-fili)/xmax;
			if (VerIntermedios(fili,coli,incrFil,incrCol,xmax-1)) {
				if (verCaptura(fili,coli,incrFil,incrCol,xmax)) return true;
				else return false;
			}
			else return false;
		}
		else return false;
	}
	//6. jugada valida para el Rey
	if (piezai=='R'){
		var incrCol;
		var incrFil;
		var xmax;
		if(coli==colf || fili==filf){//movimiento tipo torre
			xmax=Math.abs(Math.abs(colf-coli) - Math.abs(filf-fili));
			incrCol=(colf-coli)/xmax;
			incrFil=(filf-fili)/xmax;
			if (xmax==1)
				if (VerIntermedios(fili,coli,incrFil,incrCol,xmax-1)) {
				if (verCaptura(fili,coli,incrFil,incrCol,xmax)) return true;
				else return false;
			}
				else return false;
			else return false;
		}
		else if (Math.abs(fili-filf)==Math.abs(coli-colf)){//solo permite movimientos diagonales
				xmax=Math.abs(colf-coli);
				incrCol=(colf-coli)/xmax;
				incrFil=(filf-fili)/xmax;
				if (xmax==1)

				if (VerIntermedios(fili,coli,incrFil,incrCol,xmax-1)) {
				if (verCaptura(fili,coli,incrFil,incrCol,xmax)) return true;
				else return false;
			}
					else return false;
				else return false;
			}
		else return false;
	}

}

var celda=null
var colorantes=""

function moverPieza(fi,ci,ff,cf){	
	//Borramos la pieza seleccionada del ta blero
	document.getElementById("celda"+fi+ci).innerHTML=""
	tableroInfo[fi*8+ci].pieza=null
	tableroInfo[fi*8+ci].color=null
	tableroInfo[fi*8+ci].pImagen=null
	//movemos la peiza a la casilla de destino
	if(piezaSel[0].color=="B") document.getElementById("celda"+ff+cf).innerHTML=piezaSel[0].pImagen.fontcolor("#FFFFFF")
	if(piezaSel[0].color=="N") document.getElementById("celda"+ff+cf).innerHTML=piezaSel[0].pImagen.fontcolor("#0B0A0A")

	tableroInfo[ff*8+cf].pieza=piezaSel[0].pieza
	tableroInfo[ff*8+cf].color=piezaSel[0].color
	tableroInfo[ff*8+cf].pImagen=piezaSel[0].pImagen
}

function VerIntermedios(f,c,ifil,icol,xmax) {//verificamos que no hayan piezas intermedias entre la casilla incial y la casilla de destino que impidan el movimiento
	var mover="si";
		for(var x=1;x<=xmax;x++){
			if(tableroInfo[(f+ifil*x)*8+c+icol*x].pieza!=null) {
				mover="no";
				break;
			}
		}
		if (mover=="si") return true;
		else return false;
}

function verCaptura(f,c,ifil,icol,xmax) {
	if(tableroInfo[(f+ifil*xmax)*8+c+icol*xmax].pieza!=null && tableroInfo[(f+ifil*xmax)*8+c+icol*xmax].color!=piezaSel[0].color) return true;
	else if(tableroInfo[(f+ifil*xmax)*8+c+icol*xmax].pieza!=null && tableroInfo[(f+ifil*xmax)*8+c+icol*xmax].color==piezaSel[0].color) return false;
	else if (tableroInfo[(f+ifil*xmax)*8+c+icol*xmax].pieza==null) return true;
	else return false;
}