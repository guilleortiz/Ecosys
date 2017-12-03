function Cesped () {//static prey
	
	this.location=createVector(random(Math.floor((Math.random() * 300) + 100)),random(Math.floor((Math.random() * 300) + 100)));
	this.vive=true;
	this.tam=50;
	this.color="#00ff00";
	this.envejecimiento=-0.5;

	this.live=function () {
		this.update();
  		this.display();
  		this.muere();

	}



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
		
		for(var k = 0; k < iaArray.length; k++){

			var d= dist(iaArray[k].location.x,iaArray[k].location.y,this.location.x,this.location.y);
			if(d<this.tam){
				
				if (this.tam<30) {
					this.envejecimiento=0
					this.eliminar();
				
				}else{this.tam+=this.envejecimiento;}
				
			}
		}
		


	
	}

	this.eliminar=function () {
		
		this.color='#fffff';//color de fondo es a6a6a6
		
	}
}
