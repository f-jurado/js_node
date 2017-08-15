var pictures = ["wall","sinkhole","oldlady"];
function Obstacle(x,y){
	this.x = x;
	this.y = y;
	pic = assignPicture();
	this.picture = pic;
}
function assignPicture(){
	var index = Math.floor((Math.random() * 2) + 0);
	var newPic = pictures[index];
	return newPic;
}
//Maybe have a function that moves the obstacles to the left(towards start line) as vehicles proceed ahead. 

