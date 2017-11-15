var bola;
var canvas;
var ctx;
var micanvas;

var objX;
var objY;

var sigue;

var bolaComeAmarillo;
var bolaComeCyan;
var bolaComeMagenta;
var bolaComeVerde;
var bolas=[];

var cesped;
var cespdes=[];

var idInterval;
var tamanioComida=50;




function Start () {

	console.log('follow ready CV');
	sigue=createVector(0, 0);

	var canvas = createCanvas(400,400);
	canvas.id("canvas");
	micanvas = document.getElementById("canvas");
	document.querySelector('.demo-container').appendChild(micanvas);
	
	ctx = micanvas.getContext("2d");
	button = createButton('New game');
	button.position(0, 0);
	button.mousePressed(Button);

	buttonOff = createButton('stop game');
	buttonOff.position(90, 0);
	buttonOff.mousePressed(ButtonOff);

}



function setup() {

	Start();
	var stop=true;

}

function ButtonOff () {
	
	clearInterval(idInterval);

}

function Button () {
	
	loop();
	button.remove();
	buttonOff.remove();
	
	Start();
}

function creceCesped () {
	
	cespdes.push(new Cesped());
}





function draw() {

	var idInterval=setInterval(noLoop,60000);

	background('#a6a6a6');
	
	objX=mouseX;
	objY=mouseY;
	

	if (stop) {//creamos dos cesped // DEBUGGING
		cespdes.push(new Cesped());
		cespdes.push(new Cesped());
		stop=false;

	} 

	

	if (mouseIsPressed) {
	  		
		if (mouseButton == LEFT){

			if (bolas.length<4) {
			 	
			 	bolas.push(new Ball());
			 		
			}else{
				
				console.log('Prey Limit');
				return
			 		
			}
			 

		}
		    
		if (mouseButton == RIGHT){
		    	
			if (cespdes.length<100) {
			 	
			 	cespdes.push(new Cesped());
			 		
			}else{
					console.log('Limit')
			 		return
			 	}
		    }
		    
		    if (mouseButton == CENTER){
		    
		      	if (cespdes.length<100) {
			 		cespdes.push(new Cesped());
			 		cespdes[random(cespdes.length)].color='magenta';
			 		
			 	}else{
			 		//console.log('limite de cesped');
			 	}
		    }
  		}

  	for(var k = 0; k < cespdes.length; k++){
  		cespdes[k].live();
  		
  		if (cespdes[k].color=='#a6a6a6') {
  			cespdes.splice(k, 1);
  		}
  	}
  

	for(var k = 0; k < bolas.length; k++){
  		bolas[k].live();
  		if (bolas[k].tam<3) {
  			bolas.splice(k, 1);
  		}

  	
  	}
	

}

function colorCircle(centerx,centery,radius,drawColor){
  ctx.fillStyle=drawColor;
  ctx.beginPath();
  ctx.arc(centerx,centery,radius,0,Math.PI*2,true)//x , y,radio,angulo y radio ,
  ctx.fill();

}

///////

//Ball

///////******

/*

cesped

*/

/*

*/


