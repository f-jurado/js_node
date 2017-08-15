var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port:10040});


//coordinates.js
var Coordinatesjs = require("./coordinates.js");
var negative = Coordinatesjs.negative;
var positive = Coordinatesjs.positive;
var XY = Coordinatesjs.XY;
var Boundaries = Coordinatesjs.Boundaries;

//car.js
var Carjs = require("./car.js");
var Car = Carjs.Car;


//road.js
var Roadjs = require("./road.js");
var Road = Roadjs.Road;
var Obs = Roadjs.Obs;
var road;

//interval
var tp = 50;
var myInterval;
var timeInterval;


var players=[]; //array of player cars
var obstacles=[]; //array of obstacles, missiles, etc
var collision=[]; //array of boundaries of ALL objects

var width=0, height=0;

var numofplayers;
var pindex = 0;
var time = 60;
var health=[];
var playernames=[];
var mode;

function startGame(prop){
	numofplayers = prop.numofplayers;
	mode = prop.mode;
	var x = 1;
	for(i=0; i< numofplayers;i++){
		var carType = prop.cars[i];
		
		if(mode=='chase' && i==0){
			var pl = new Car(20,i*100 + 1,'jet');
			players.push(pl);
			x=50;
			collision.push(pl);
		}
		else{
			var pl = new Car(x*20,i*100 + 1,carType);
			players.push(pl);
			collision.push(pl);
		}
	}
	
}

function playerFunction(car){
	car.headTo();
	car.collide(collision,road);
	health.push(car.health);
}

function actionFunction(action,pnum){
	var c = players[pnum];
	if (mode == 'chase'){
		var newobject;
		if(pnum==0){//jet
			newobject = new Obs(52,road);
			newobject.position.x = c.position.x + 100;
		}
		else{//other players
			newobject = new Obs(51,road);
			newobject.position.x = c.position.x - 50;
		}
		newobject.position.y = c.position.y;
		obstacles.push(newobject);
		collision.push(newobject);
	}
	
}

function roadFunction(){
	var randomnumber = Math.round(Math.random() * 20 + 1);
	if(randomnumber==5 && mode != 'chase'){
		var newobject = new Obs(50,road);
		obstacles.push(newobject);
		collision.push(newobject);
	}
	road.move(road);
	for (i=0;i<obstacles.length; i++) {
		var n = obstacles[i];

		n.move(collision,obstacles);
		if(n.boundary.bottomright.x < 0){
			var index = obstacles.indexOf(n);
			obstacles.splice(index, 1);
		}
	}
	
}
function update(){
	var winner = updateWinner();
	var gameState={};
	roadFunction();
	gameState['time'] = time;
	gameState['road']=road;
	gameState['obstacles']=obstacles;
	gameState['players']=players;
	gameState['time']=time;
	gameState['winner'] = winner;
	gameState['health']=health;
	gameState['playernames']=playernames;
	wss.broadcast(JSON.stringify(gameState));
	
	
	health = [];
	for(i in players){
		playerFunction(players[i]);
		
	}
}

function updateTime(){
	time--;
}
function updateWinner(){
	var w = 10;
	var h = 100;
	for(i in health){
		if(health[i]<h){
			h = health[i];
			w = i;
		}
	}
	return w.toString();;
}


wss.on('close', function() {
    console.log('disconnected');
});

wss.broadcast = function(message){
	var i;
	for(i=0;i<this.clients.length;i++){
		if(this.clients[i].readyState == this.clients[0].OPEN){
			this.clients[i].send(message);
		}
	}
}

wss.on('connection', function(ws) {
	
	ws.on('message', function(message){
		var prop=JSON.parse(message);
		if(prop.control != 'control'){
			if(width==0){//this will run only once
				width=prop.width;
				height=prop.height;
				road = new Road(width,height);
				startGame(prop);
			}
			else if(prop.start == 'start'){
				myInterval= setInterval(update, tp);
				timeInterval = setInterval(updateTime, 1000);
			}
		}
		else if(prop.control == 'control'){//control.html
			if(prop.newplayer == 'newplayer'){
				if(pindex < numofplayers){
					ws.send(JSON.stringify({ 'player': pindex} ))
					playernames.push(prop.playername);
					pindex++;
				}
			}
			else if(prop.player != null){
				var pnumber = parseInt(prop.player)-1;
				if(prop.action != null){
					actionFunction(prop.action,pnumber);
				}
				else{
					players[pnumber].move(prop.move);
				}
			}
		}
		
	});
	
});

var express = require('express');
var serveStatic = require('serve-static');
var app = express();
app.use(serveStatic(__dirname));
app.listen(10048);
console.log("express server running on port 10048");
