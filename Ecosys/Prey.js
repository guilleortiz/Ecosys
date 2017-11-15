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