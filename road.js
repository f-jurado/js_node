var Coordsjs = require("./coordinates.js");
var XY = Coordsjs.XY;
var Boundaries = Coordsjs.Boundaries;
var negative = Coordsjs.negative;
var positive = Coordsjs.positive;
var changeBoundaries = Coordsjs.changeBoundaries;



// Obstacle Class


exports.Obs = function(size,road){
	this.width=size;
	this.height=size;
	this.position = new XY(road.width,(Math.random() * (road.height-this.height)));
	
	this.speed = negative(Math.floor((Math.random() * 10) + 4));

  if (this.width > 50) {
    if(this.width == 51){//this is player missile
		this.img="assets/missile.png";
		this.speed = -14;
		this.width=15;
		this.height=15;
	}
	else if(this.width == 52){//this is jet missle
		this.img="assets/missile.png";
		this.speed = 14;
		this.width=50;
		this.height=20;
	}
   }
   else {
    var p = Math.floor(Math.random()*3)+1;
	if(p==1){
		var r = Math.floor(Math.random()*3) + 1;
		this.img = "assets/rock" + r.toString() + ".png";
	}else if(p==2){
		this.img="assets/wall.png";
	}else if(p==3){
		this.img="assets/oldlady.png";
	}
    
  }
	this.health=1;
	
	this.boundary = new Boundaries(new XY(this.position.x,this.position.y),new XY(this.position.x+this.width,this.position.y+this.height));
}

exports.Obs.prototype.move = function(collision,obstacles){
	this.position.x += this.speed;
	changeBoundaries(this);
	this.hit(collision,obstacles);
}

//remove obstacle when hit
exports.Obs.prototype.hit = function(collision,obstacles){
	if(this.health <= 0){
		var index = collision.indexOf(this);
    collision.splice(index, 1);
		index = obstacles.indexOf(this);
    obstacles.splice(index, 1);
	}
}

exports.Road = function(width,height){
	this.x = 0;
	this.width = width;
	this.height = height;
	this.img = "assets/road.png";
	this.boundary = new Boundaries(new XY(0,0),new XY(width,height));
}

exports.Road.prototype.move = function(road){
  road.x -= 12;     
  if (road.x < -60) {
    	road.x = 0;
    }
}
