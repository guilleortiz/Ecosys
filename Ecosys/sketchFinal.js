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
	buttonOff.position(50, 0);
	buttonOff.mousePressed(ButtonOff);

}



function setup() {

	Start();

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
  		cespdes[k].update();
  		cespdes[k].display();
  		cespdes[k].muere();
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



function Ball() {

	var t=0.02;
	var x = noise(t);
  	x = map(x,0,1,0,width);

  	var y = noise(t);
  	y = map(y,0,1,0,height);

	this.location=createVector(random(width),random(height));
	this.velocity=createVector(0,0);
	this.acceleration=createVector(0,0);
	this.topSpeed=float(4);
	this.propio=createVector(random(0.1,0.2),random(0.1,0.2));
	this.estado="buscando";

	this.tam=15;
	this.color='black';
	this.campoVison=200;
	this.colorComida="green";
	this.envejecimiento=-0.05;

	this.Mimouse;
	this.caminoComida=createVector(0,0);

	this.update=function(){ 
		
		this.Mimouse=this.track();
		this.dir=p5.Vector.sub(this.Mimouse,this.location);
		this.dir.normalize();
		this.dir.mult(0.5);
		this.acceleration=this.dir;
		this.velocity.add(this.acceleration);
		this.velocity.add(this.propio);
		this.velocity.limit(this.topSpeed);
		this.location.add(this.velocity);
	}


	
	this.setComida=function (color) {

		this.colorComida=color;
	}

	this.setObjetivo=function (x,y) {
		this.caminoComida.x=x;
		this.caminoComida.y=y;
	}
	



	this.getComida=function () {

		return this.colorComida;
	}

	this.getObjetivo=function () {

		return this.caminoComida;
		
	}

	this.live=function () {
	
		
		this.update();
		this.display();
		this.changeVelocity();
		

		var imposibleVector=createVector(Math.floor((Math.random() * 800) + 500),Math.floor((Math.random() * 800) + 500));
		fill("orange");
		ellipse(imposibleVector.x,imposibleVector.y,50,50);

		if (cespdes.length==0) {
				this.comer(imposibleVector);
			}else{this.comer(this.Mimouse);}
		
		this.muere();

		
	}

	this.muere=function () {
		
		
		if (this.tam<0) {
			this.envejecimiento=0;
		
			
		}else{this.tam+=this.envejecimiento;}
	}

	


	this.display=function(){

	    fill(this.color);
	    ellipse(this.location.x,this.location.y,this.tam,this.tam);


	}

	this.comer=function(presa){
		
		var d= dist(presa.x,presa.y,this.location.x,this.location.y);

		noFill();

		if(d<this.tam){
			if (this.tam>80) {
				this.tam+=0;
			}else{this.tam+=5;}
			
			
			console.log("comiendo");
			

		} else{

			this.muere();
			
		}
		

	}

	this.changeVelocity=function  () {

		if (this.tam>=50) {
				this.topSpeed=float(1);
				
				}else if (this.tam>=35) {
					this.topSpeed=float(2);
					
					}else if (this.tam>=25) {
						this.topSpeed=float(3);
						
						}else if (this.tam>=15) {
								this.topSpeed=float(4);
								
							}else if (this.tam>=15) {
								this.topSpeed=float(6);
								}else  {
									this.topSpeed=float(8);
									
								}
	}


	
	this.track=function () {
		var vaina=createVector(random(width),random(height));
		
		tracking.ColorTracker.registerColor('green', function(r, g, b) {
		  if (r < 50 && g > 200 && b < 50) {
		    return true;
		  }
		  return false;
		});

		tracker = new tracking.ColorTracker([this.getComida()]);

		window.plot = function(x, y, w, h, color) {
		  
	  		var tempvect=createVector(x,y);
	  		noFill();
	  		stroke('red');
	  		rect(x-10, y-10, w+20, h+20);

			fill(255);
	  		strokeWeight(0);
			textSize(12);
			textStyle(NORMAL);
			text('x:'+x,x-20,y);
			text('y:'+y,x-20,y+10);
         
	  		return tempvect;
	  		
		};

		tracker.on('track', function(event) {
			if (event.data.length === 0) {//nothing detected in this frame
				//console.log('nada');
				

			}else{
				//console.log('track visto');
				
				event.data.forEach(function(rect) {
					this.estado="siguendo";
					this.caminoComida=window.plot(rect.x, rect.y, rect.width, rect.height, rect.color); 
			    	//console.log('tracking this.caminoComida= '+	this.caminoComida);
			    	
			    	this.extract=function (kk) {
		      			vaina=kk;
		      
		      		}
			    	this.extract(this.caminoComida);
		    	
		  });
		}
			
		});



		tracking.track('#canvas',tracker);
		
				 
	      return vaina;
		
	}
	


}

function Cesped () {
	
	this.location=createVector(random(Math.floor((Math.random() * 300) + 100)),random(Math.floor((Math.random() * 300) + 100)));
	this.vive=true;
	this.tam=50;
	this.color="#00ff00";
	this.envejecimiento=-0.5;

	this.update=function(){

			if (this.vive) {
			
			}else{

			}
			

	}

	this.display=function(){

		noStroke();
	    fill(this.color);
	    ellipse(this.location.x,this.location.y,this.tam,this.tam);


	}
	this.muere=function () {
		
		for(var k = 0; k < bolas.length; k++){

			var d= dist(bolas[k].location.x,bolas[k].location.y,this.location.x,this.location.y);
			if(d<this.tam){
				
				if (this.tam<30) {
					this.envejecimiento=0
					this.eliminar();
				
				}else{this.tam+=this.envejecimiento;}
				
			}
		}
		


	
	}

	this.eliminar=function () {
		
		this.color='#a6a6a6';
		
	}
}



function Comida() {
	var t=0.02;
	 var x = noise(t);
  	x = map(x,0,1,0,100);

  	var y = noise(t);
  	y = map(y,0,1,0,100);

	this.location=createVector(x,y);
	this.velocity=createVector(0,0);
	this.acceleration=createVector(0,0);
	this.topSpeed=float(9);
	this.propio=createVector(random(0.1,0.2),random(0.1,0.2));
	this.tam=50;
	this.color='cyan';
	this.campoVison=200;

	this.update=function(){

			this.mouse=createVector(random(width),random(height));
			this.dir=p5.Vector.sub(this.mouse,this.location);
			
			this.dir.normalize();
			this.dir.mult(0.5);

			this.acceleration=this.dir;

			this.velocity.add(this.acceleration);
			this.velocity.add(this.propio);
			this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);
			

	}

	this.display=function(){

		
	    fill(this.color);
	    ellipse(this.location.x,this.location.y,this.tam,this.tam);


	}

	this.morir=function(cazador,presa){

		var d= dist(cazador.location.x,cazador.location.y,this.location.x,this.location.y);
		if(d<20){
			
			if(this.tam>=1){
				this.tam--;
				delete presa;
				noLoop();


			}else{
				delete presa;
			}
			
		}


	}

}