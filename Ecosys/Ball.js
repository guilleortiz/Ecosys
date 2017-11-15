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

	this.Mimouse;//nada que ver con el mouse
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
		
		var d= dist(presa.x,presa.y,this.location.x,this.location.y);//distancian entre presa y localizacion actual

		noFill();

		if(d<this.tam){//si esta tocando la comida, crece hasta el max de 80
			if (this.tam>80) {
				this.tam+=0;
			}else{this.tam+=5;}
			
			
			console.log("comiendo");
			

		} else{//si no esta tocando la comida empieza el proceso de muerte

			this.muere();
			
		}
		

	}

	this.changeVelocity=function  () {//cambia velocidad segun su tamaño

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


	
	this.track=function () {//la chicha

		var vaina=createVector(random(width),random(height));
		
		tracking.ColorTracker.registerColor('green', function(r, g, b) {//registramos el color a seguir
		  if (r < 50 && g > 200 && b < 50) {
		    return true;
		  }
		  return false;
		});

		tracker = new tracking.ColorTracker([this.getComida()]);//instancia track del color de la comida

		window.plot = function(x, y, w, h, color) {
		  
	  		var tempvect=createVector(x,y);
	  		noFill();
	  		stroke('red');
	  		rect(x-10, y-10, w+20, h+20);//creamos un rectangulo al rededor de un color detectado
	  									//-----BUG----La bola sigue a un cesded diferente al del rectangulo

			fill(255);//mostramos x,y cartesianos
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

					console.log("DEBUGIN: "+rect.x+","+rect.y+""+rect.color);

					this.caminoComida=window.plot(rect.x, rect.y, rect.width, rect.height, rect.color); //le pasamos 
																										//datos del cuadrado
			    	//console.log('tracking this.caminoComida= '+	this.caminoComida);
			    	
			    	this.extract=function (kk) {
		      			vaina=kk;
		      		}

			    	this.extract(this.caminoComida);//creo que usado para extraer el camino a comida
		    	
		  		});
			}
			
		});



		tracking.track('#canvas',tracker);
		
				 
	      return vaina;
		
	}
	


}