var Coordsjs = require("./coordinates.js");
var XY = Coordsjs.XY;
var Boundaries = Coordsjs.Boundaries;
var negative = Coordsjs.negative;
var positive = Coordsjs.positive;
var changeBoundaries = Coordsjs.changeBoundaries;

exports.Car = function(x,y,carType){
	if(carType=="blue"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 1*5;
		this.steering = 1;
		this.breaking = 5;
		this.type="assets/car_blue.png";
	}else if(carType=="red"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 2*5;
		this.steering = 2;
		this.breaking = 6;
		this.type="assets/car_red.png";
	}else if(carType=="green"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 3*5;
		this.steering = 3;
		this.breaking = 7;
		this.type="assets/car_green.png";
	}
	else if(carType=="jet"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 1*5;
		this.steering = 1;
		this.breaking = 5;
		this.type="assets/Jet.png";
	}else if(carType=="orange"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 2.5*5;
		this.steering = 3;
		this.breaking = 7;
		this.type="assets/car_orange.png";
	}else if(carType=="black"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 2.4*5;
		this.steering = 3;
		this.breaking = 7;
		this.type="assets/car_black.png";
	}else if(carType=="yellow"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 2.3*5;
		this.steering = 3;
		this.breaking = 7;
		this.type="assets/car_yellow.png";
	}else if(carType=="pink"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 2.8*5;
		this.steering = 3;
		this.breaking = 7;
		this.type="assets/car_pink.png";
	}else if(carType=="purple"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 2.6*5;
		this.steering = 3;
		this.breaking = 7;
		this.type="assets/car_purple.png";
	}else if(carType=="cyan"){
		this.velocity=new XY(0,0);
		this.accelerationMagnitude = 2.7*5;
		this.steering = 3;
		this.breaking = 7;
		this.type="assets/car_cyan.png";
	}
	
	
	
	var tall=19*3;
	var wide=46*3;
	this.width=wide;
	this.height=tall;
	this.position=new XY(x,y);
	this.health = 100;
	this.boundary = new Boundaries(this.position,new XY(this.position.x+this.width,this.position.y+this.height));
	
	
}
	
exports.Car.prototype.headTo=function(){
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
	changeBoundaries(this);
}


//place breaking here*************************
exports.Car.prototype.move=function(code){
	if(code == '38') {
        // up arrow
		if(this.velocity.y> 10){
			//car.velocity.y = positive(car.velocity.y/car.breaking);
			this.velocity.y = 0;
		}
		this.changeSpeed(0,-1);
    }
    if(code == '40') {
        // down arrow
		if(this.velocity.y< -10){
			//car.velocity.y = negative(car.velocity.y/car.breaking);
			this.velocity.y = 0;
		}
		this.changeSpeed(0,1);
    }
    if(code == '37') {
       // left arrow
		if(this.velocity.x> 10){
			//car.velocity.x = positive(car.velocity.x/car.breaking,2);
			this.velocity.x = 0;
		}
		this.changeSpeed(-1,0);
    }
    if(code == '39') {
       // right arrow
		if(this.velocity.x< -10){
			//car.velocity.x = negative(car.velocity.x/car.breaking);
			this.velocity.x = 0;
		}
		this.changeSpeed(1,0);
    }
}




exports.Car.prototype.collide=function(cArray,road){
	//walls of the canvas
	if(this.position.x < road.boundary.topleft.x){
		this.position.x = road.boundary.topleft.y;
		this.velocity.x = positive(this.velocity.x)*.6;
	}
	else if(this.position.x > road.boundary.bottomright.x-this.width){
		this.position.x = road.boundary.bottomright.x-this.width;
		this.velocity.x = negative(this.velocity.x)*.6;
	}
	else if(this.position.y < road.boundary.topleft.y){
		this.position.y = road.boundary.topleft.y;
		this.velocity.y = positive(this.velocity.y)*.6;
	}
	else if(this.position.y > road.boundary.bottomright.y-this.height){
		this.position.y = road.boundary.bottomright.y-this.height;
		this.velocity.y = negative(this.velocity.y)*.6;
	}


	else{
	for(i=0;i<cArray.length; i++){
		var x1 = cArray[i].boundary.topleft.x;
		var y1 = cArray[i].boundary.topleft.y;
		var x2 = cArray[i].boundary.bottomright.x;
		var y2 = cArray[i].boundary.bottomright.y;
		
		var carX1 = this.position.x;
		var carY1 = this.position.y;
		var carX2 = this.position.x+this.width;
		var carY2 = this.position.y+this.height;
		
		
		//object is higher and to the left
		if(carX1 > x1 && carY1 > y1 && carX1 < x2 && carY1 < y2){
			this.velocity.x = positive(this.velocity.x)*.6;
			this.velocity.y = positive(this.velocity.y)*.6;
			this.position.x = x2+7;
			this.position.y = y2+7;
			this.health -= 1; cArray[i].health -= 1;
		}
		
		
		
		//object is higher and to the right
		else if(carX2 > x1 && carY1 < y2 && carX2 < x2 && carY1 > y1){
			this.velocity.x = negative(this.velocity.x)*.6;
			this.velocity.y = positive(this.velocity.y)*.6;
			this.position.x = x1 - this.width - 7;
			this.position.y = y2+7;
			this.health -= 1; cArray[i].health -= 1;
		}
		
		
		
		//object is lower and to the left
		else if(carX1 > x1 && carY2 > y1 && carX1 < x2 && carY1 < y2){
			this.velocity.x = positive(this.velocity.x)*.6;
			this.velocity.y = negative(this.velocity.y)*.6;
			this.position.x = x2+7;
			this.position.y = y1-this.height-7;
			this.health -= 1; cArray[i].health -= 1;
		}
		
		
		
		
		//object is lower and to the right
		else if(carX2 < x2 && carY2 < y2 && carX2 > x1 && carY2 > y1){
			this.velocity.x = negative(this.velocity.x)*.6;
			this.velocity.y = negative(this.velocity.y)*.6;
			this.position.x = x1-this.width - 7;
			this.position.y = y1-this.height - 7;
			this.health -= 1; cArray[i].health -= 1;
		}
	}}
}

exports.Car.prototype.changeSpeed=function(aX, aY){
	this.velocity.x += aX*this.accelerationMagnitude;
	this.velocity.y += aY*this.accelerationMagnitude;
}
