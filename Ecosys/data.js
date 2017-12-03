var s = function( p ) { // p could be any variable name
  var x = 100; 
  var y = 100;
  p.setup = function() {
  var canvas=p.createCanvas(200, 500);
  
  var x = (windowWidth - width) / 90;
  var y = (windowHeight - height) / 2;
  canvas.position(x,y);
  };

  p.draw = function() {
    p.background(200);
    p.fill(100);
    p.textSize(15);
    p.text("Pos: "+parseInt(iaArray[0].location.x)+","+parseInt(iaArray[0].location.y),10,30);
    p.text("PosComida: "+rect.x+","+rect.y+""+rect.color,10,50);
  };
};
var myp5 = new p5(s, 'c1');