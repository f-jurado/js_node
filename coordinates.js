exports.negative = function(x){
	if(x<=0){
		return x;
	}
	return -1 * x;
}
exports.positive = function(x){
	if(x>=0){
		return x;
	}
	return -1 * x;
}

exports.XY = function(x,y){
	this.x=x; this.y=y;
}

exports.Boundaries = function(tlpos,brpos){
	this.topleft=tlpos;
	this.bottomright=brpos;
}

exports.changeBoundaries = function(obj){
	obj.boundary.topleft.x = obj.position.x;
	obj.boundary.topleft.y = obj.position.y;
	obj.boundary.bottomright.x = obj.position.x + obj.width;
	obj.boundary.bottomright.y = obj.position.y + obj.height;
}
