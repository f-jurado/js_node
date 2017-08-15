var road;
var myInterval;
var timeInterval;
function randint(n){ return Math.round(Math.random()*n); }
function rand(n){ return Math.random()*n; }

var width=0, height=0;
var context;


var players=[];
var obstacles=[];

//array of Boundaries
//Boundaries = 2 pairs of xy coordinates. first is topleft, second is bottomright
var collision=[];
			

// Speed - Velocity
var vx = 0;
var vy = 0;
   
// Acceleration
var ax = 0;
var ay = 0;

			
function drawRoad(){
	context.drawImage(road.img, (road.x*(-1)), 0,road.width,road.height,road.x,0,road.width*1.5,road.height);
  // draw obstacles
	var randomnumber = Math.round(Math.random() * 20 + 1);
	if(randomnumber==5){
		
		var newobject = new Obs(50);
		obstacles.push(newobject);
		collision.push(newobject);
	}

	for (i=0;i<obstacles.length; i++) {
		var n = obstacles[i];
		n.move();
    	context.drawImage(n.img,n.position.x, n.position.y, n.width, n.height);
		
	}
	road.move(road);
	
}
			

function player(car){
	car.headTo(road);	
	context.drawImage(car.type,car.position.x,car.position.y,car.width,car.height);
}
			
			
			
/////////////////////////////////////////////////////////////
function swiping (eventType, event) {
	var html=eventType;
	event.preventDefault();
				
	var defY = 0;
	
	if (html == "touchend"){
		vy = 0;
	}
	if (html == "touchmove"){
		for (var i = 0; i < event.touches.length ; i++) {
			   var touch = event.touches[i];
			if(defY<touch.pageY){
				vy = 1;
				defY = touch.pageY;
			}
			else{
				vy = -1;
				defY = touch.pageY;
			}
			defY = touch.pageY;
						
		}
	}
				
				
}
/////////////////////////////////////////////////////////////
			
			

	
			
			
			
			
function update(){
	// clear the screen 
	context.clearRect (0, 0, width, height);	
	drawRoad();
	
	if(players.length>0){
		players[0].collide(collision,road);
	}
	for(i in players){
		player(players[i]);
	}
}
function keymove(evt){
	move(players[0],evt.keyCode);
}
			

var time;
var tp = 50;
function start(){
	ol();
	time =60;
}
function updateTime(){
	if(time >0){
		time-=1;
		var canvas = document.getElementById("timer");
		var ctx=canvas.getContext("2d");
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(150,0,50,50);
		ctx.font="20px Arial";
		ctx.fillStyle = "#FF0000";
		ctx.fillText("Time Remaining: "+ time,5,30);
	}else{
		clearInterval(myInterval);
		clearInterval(timeInterval);
		alert("Time Over!! Insert Coin to continue");
	}
}

function ol(){
	var canvas = document.getElementById("canvas");
	context=canvas.getContext("2d");
	canvas.style.overflow = "hidden";
				
	width = window.innerWidth-30;
	height = window.innerHeight*.75;
			
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
	canvas.width = width;
	canvas.height = height;

	road = new Road(width,height);
	
	var t = new Image();
	t.src = "assets/car_green.png";
	var p1 = new Car(new XY(0,10),new XY(0,0),t,.1,1,5);
	players.push(p1);
	
	
	
	var w = new Image();
	w.src = "assets/car_green.png";
	var p2 = new Car(new XY(200,100),new XY(0,0),w,1,1,5);
	players.push(p2);
	//collision.push(new Boundaries(new XY(p2.position.x,p2.position.y),new XY(p2.position.x+p2.width,p2.position.y+p2.height)));
	collision.push(p2);
	
	
	
				
	window.addEventListener('keydown',keymove,true);
	window.addEventListener('keypress',keymove,true);
				
				
	/////////////////////////////////////////////////////////////
	window.ondevicemotion = function(event) {
		ax = event.accelerationIncludingGravity.x * .05;
		ay = event.accelerationIncludingGravity.y * .05;
	}
				
	canvas.addEventListener ('touchend', function (event) { swiping("touchend", event); });
	canvas.addEventListener ('touchmove', function (event) { swiping("touchmove", event); });
	canvas.addEventListener ('touchstart', function (event) { swiping("touchstart", event) ;});
	/////////////////////////////////////////////////////////////
				
				
				
	// let the world run
	myInterval= setInterval(update, tp);
	timeInterval = setInterval(updateTime, 1000);
}
var n = 1;
var pauseBtn = document.getElementById("stop");
function stop(){
	var l = n%2;
	if(l ==0){//even
		document.getElementById("stop").innerHTML = "Pause Race";
		myInterval= setInterval(update, tp);
		timeInterval = setInterval(updateTime,1000);
		n += 1;
	}else{
//odd
		document.getElementById("stop").innerHTML = "Resume Race";
		clearInterval(myInterval);
		clearInterval(timeInterval);
		n += 1;
	}
}
