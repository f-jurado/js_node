var second;
		function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
		});
		return vars;
		}
		if(window.innerHeight > window.innerWidth){
			alert("Put device in landscape");
		}
		var myvar = getUrlVars();
		var socket;
		var player; //player number as a string
		var direction; //38 = up, 40 down, 37 left, 39 right
		var width = window.innerWidth;
		var height = window.innerHeight*.75;
		$(function(){
		socket = new WebSocket("ws://cslinux.utm.utoronto.ca:10040");
		socket.onopen = function (event) {
		//use to ask for a player number
		socket.send(JSON.stringify({ 'control': 'control', 'newplayer': 'newplayer',playername:myvar['user']} ));
		};

		socket.onclose = function (event) {
		//console.log("closed code:" + event.code + " reason:" +event.reason + " wasClean:"+event.wasClean);
		};
		socket.onmessage = function (event) {
		var game=JSON.parse(event.data);
		if(game.player != null){
		player = parseInt(game.player)+1;
		alert('player = '+player);
		}
		}
		});
		//use this function to send direction messages to broadcast.js
		function moveFunction(){
		socket.send(JSON.stringify({ 'control': 'control', 'player': player, 'move': direction} ));
		}
$(function(){
	var canvas = document.getElementById("controller");
	ctx=canvas.getContext("2d");
	canvas.style.overflow = "hidden";
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';
	canvas.width = width;
	canvas.height = height;
	var up = new Image;
	up.src = "assets/dUp.png";
	up.onload = function() {
		ctx.drawImage(up, 90, 83,80,80);
	}
	var down = new Image;
	down.src = "assets/dDown.png";
	down.onload = function() {
		ctx.drawImage(down, 90, 210,80,80);
	}
	var left = new Image;
	left.src = "assets/dLeft.png";
	left.onload = function() {
		ctx.drawImage(left, 10, 140,80,80);
	}
	var right = new Image;
	right.src = "assets/dR.png";
	right.onload = function() {
		ctx.drawImage(right, 170, 150,80,80);
	}
	ol();
	});
	function updateTouch (eventType, event) {
				var canvas=document.getElementById ('controller');
				event.preventDefault();
				for (var i = 0; i < event.touches.length ; i++) {
			    	var touch = event.touches[i];
					//alert(touch.pageX + " " + touch.pageY);
					if(touch.pageX>90 && touch.pageX<170 && touch.pageY>83 && touch.pageY<163){
						//If up button pressed
						socket.send(JSON.stringify({ 'control': 'control', 'player':player , 'move': '38'} ));
					
					}
					if(touch.pageX>90 && touch.pageX<170 && touch.pageY>210 && touch.pageY<290){
							//If down button pressed
							socket.send(JSON.stringify({ 'control': 'control', 'player':player , 'move': '40'} ));
					}
					if(10<touch.pageX && touch.pageX<90 && touch.pageY>140 && touch.pageY<220){
						//left
						socket.send(JSON.stringify({ 'control': 'control', 'player':player , 'move': '37'} ));
					}
					if(170<touch.pageX && touch.pageX<250 && touch.pageY>150 && touch.pageY<230){
						//Right pressed
						socket.send(JSON.stringify({ 'control': 'control', 'player':player , 'move': '39'} ));
						
					}
			  	}
				
				//document.getElementById('touch').innerHTML=html;
	}
	function ol () {
		setInterval(resetSecond,1000);
		var canvas = document.getElementById ('controller');
		canvas.addEventListener ('touchend', function (event) { updateTouch("touchend", event); });
		canvas.addEventListener ('touchmove', function (event) { updateTouch("touchmove", event); });
		canvas.addEventListener ('touchstart', function (event) { updateTouch("touchstart", event) ;});
		window.addEventListener('deviceorientation', function(eventData) {
					// gamma is the left-to-right tilt in degrees, where right is positive
					var tiltLR = eventData.gamma;
					deviceOrientationHandler(tiltLR);
					}, false);
					
	}
	function resetSecond(){
		second = 1;
	}
	function deviceOrientationHandler(tiltLR) {
		if(-55<tiltLR && tiltLR<-50){
			if(second == 1){
				socket.send(JSON.stringify({'control': 'control', 'player':player , 'action': 'action' }));
				second=0;			
			}
		}
	}
