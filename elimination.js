var xTaken = [];
var yTaken = [];
function Elimination(){
	this.maxround = 10;
	this.winner = null;
	this.obstaclesLocation = null;
	console.log("Elimination mode started");
}
Elimination.prototype.generateObstacles=function(){
	//Using the Obstacle class generate a list of obstacles here
	//Call a function that randomly generates a new obstacle object with some x and y values
	//using a loop we can generate some amount of obstacles
	var counter;	
	for(counter = 0; counter < 40; counter++){
		var 
	}
}
function generateObstacle(){
	//Depending on what the max and min x,y values are we will change it here
	//In the random function
	var x = Math.floor((Math.random() * 10) + 1);
	var y = Math.floor((Math.random() * 10) + 1);
	while(xTaken.indexOf(x)!=-1){
		x = Math.floor((Math.random() * 10) + 1);
	}
	var obs = Obstacle(x,y);
	xTaken.push(x);
	yTaken.push(y);
	return obs;
}
