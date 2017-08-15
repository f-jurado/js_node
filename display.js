var socket;
			var roadContext;
			var timerContext;
			var width = window.innerWidth-30;
			var height = window.innerHeight*.75;
			var roadImg = new Image();
			


			var mode;
			var numplayers;
			var cars=[];
			var players;
			

			function select(){
				$('#select').after('<button id="chase" title="A scary jet is chasing you. You and your team must destroy it. Player 1 is Jet." onclick="selectNumPlayers(\'chase\')"></button>');
				$('#select').after('<button id="race" title="A standard race. First to reach finish line wins." onclick="selectNumPlayers(\'race\')"></button>');
				$('#select').after('<button id="elimination" title="Last Vehicle Standing Wins!" onclick="selectNumPlayers(\'elimination\')"></button>');
				$('#select').hide();
			}

			function selectNumPlayers(m){
				mode = m;
				$('#chase').after('<p id="playerstag">Select Number of Players</p>');
				$('#chase').after('<button id="player4" onclick="selectCars(\'4\')"></button>');
				$('#chase').after('<button id="player3" onclick="selectCars(\'3\')"></button>');
				$('#chase').after('<button id="player2" onclick="selectCars(\'2\')"></button>');
				$('#chase').after('<button id="player1" onclick="selectCars(\'1\')"></button>');
				$("#elimination").hide();
				$("#race").hide();
				$("#chase").hide();
				
			}
			function selectCars(n){
				numplayers = n;
				var nInt = parseInt(n);
				

				$('#playerstag').hide();
				var p = ['Blue','Green','Red','Cyan','Black','Gray','Orange','Pink','Purple','Yellow'];
				var y = ['carone','cartwo','carthree','carfour'];
				var yindex = 0;
				for(i=0;i<nInt;i++){
					$('#player2').before('<select id="'+y[i]+'"><option value="blue">Blue</option><option value="green">Green</option><option value="red">Red</option><option value="black">Black</option><option value="cyan">Cyan</option><option value="Orange">Orange</option><option value="Pink">Pink</option><option value="Purple">Purple</option><option value="Yellow">Yellow</option></select>');
				}
				$('#player2').after('<button id="sendSocket" onclick="startSocket()"></button>');
				$("#player2").hide();
				$("#player3").hide();
				$("#player4").hide();
				$("#player1").hide();
				
			}
			
			function drawRoad(game){
				var road = game.road;
				
				roadImg.src = road.img;
				roadContext.drawImage(roadImg, (road.x*(-1)), 0,road.width,road.height,road.x,0,road.width*1.5,road.height);
				
				var obstacles = game.obstacles;
				for (i=0;i<obstacles.length; i++) {
					var n = obstacles[i];
					var obsImg = new Image();
					obsImg.src = n.img;
					
					roadContext.drawImage(obsImg,n.position.x, n.position.y, n.width, n.height);
		
				}
			}

			function drawPlayers(game){
				players = game.players;
				for(i in players){
					var car = players[i];
					var pimg = new Image();
					pimg.src = car.type;
					roadContext.drawImage(pimg,car.position.x,car.position.y,car.width,car.height);
				}
			}
			
			
			function update(game){
			// clear the screen 
				roadContext.clearRect (0, 0, width, height);	
				drawRoad(game);
				drawPlayers(game);
				
			}
		
			function startSocket(){

				//add to cars[]
				var nInt = parseInt(numplayers);
				var y = ['carone','cartwo','carthree','carfour'];
				
				for(i=0;i<nInt;i++){
					cars.push($('#'+y[i]).val());
					$('#'+y[i]).hide();
				}
				


		
				socket = new WebSocket("ws://cslinux.utm.utoronto.ca:10040");
				socket.onopen = function (event) {
					console.log("connected");
					socket.send(JSON.stringify({ 'width': width, 'height': height, 'mode': mode, 'numofplayers' : numplayers, 'cars': cars} ));
					
					var canvas = document.getElementById("road");
					roadContext=canvas.getContext("2d");
					canvas.style.overflow = "hidden";
					canvas.style.width = width + 'px';
					canvas.style.height = height + 'px';
					canvas.width = width;
					canvas.height = height;

				};
				
				
				socket.onclose = function (event) {
					console.log("closed code:" + event.code + " reason:" +event.reason + " wasClean:"+event.wasClean);
				};
				
				
				socket.onmessage = function (event) {
					var game=JSON.parse(event.data);
					update(game);
					updateTime(game);
				};




				$('#sendSocket').after('<p id= "waiting" >Press start when all players connected</p>');
				$('#sendSocket').after('<button id="start" onclick="startGame()"></button>');
				if(mode == "chase"){
					$('#sendSocket').after('<p id="info">One player controllers an enemy vehicle(Jet). The role of the enemy is to defeat all other players by damaging their vehicles. Players need to stay away from the enemy until they get to a safe house or until the enemy jet is defeated. As each player gets defeated the enemy gets stronger. </p>');	
				}else if (mode == "elimination"){
					$('#sendSocket').after('<p id="info">Players race against each other. The last player standing wins the round. First player to win ten rounds wins the match. There will be obstacles and weapons that players can use to eliminate each other.</p>');
				}else{
					$('#sendSocket').after('<p id="info">Players race towards a finish line. Players who fail to keep up will be eliminated. There will be speed boosts to assist the players and hindrances to slow them down. The First player to reach the finish line wins. </p>');
				}
				
				$('#sendSocket').hide();
				
				
				
			}

			function startGame(){
				$('#timer').show();
				$('#road').show();
				$('#start').hide();
				$('#info').hide();

				socket.send(JSON.stringify({ 'start': 'start'} )); //start game
				$('p').hide();
				$('h1').hide();
			}

			

			



			function updateTime(game){
				var time = parseInt(game.time);
				var health = game.health;
				var winner = game.winner;
				var playernames = game.playernames;
				if(time >0){
					var canvas = document.getElementById("timer");
					var timerContext=canvas.getContext("2d");
					canvas.style.overflow = "hidden";
					canvas.style.width = (width*.95) + 'px';
					canvas.style.height = (height/3.75) + 'px';
					canvas.width = (width*.95) ;
					canvas.height = (height/3.75);
					
					
					
					
					timerContext.fillStyle = "#FFFFFF";
					timerContext.fillRect(0,0,1000,1000);
					timerContext.font="25px Arial";
					timerContext.fillStyle = "#FF0000";
					timerContext.fillText("Time Remaining: "+ time,5,75);
					
					
					//display health
					timerContext.fillStyle = "#FFFFFF";
					timerContext.fillRect(350,0,2000,1000);
					timerContext.font="25px Arial";
					timerContext.fillStyle = "#0000FF";
					for(r in health){
						if(r==0){
						timerContext.fillText("Player "+ playernames[r] + "health:"+health[r],300,25);
						}else if(r==1){
							timerContext.fillText("Player "+ playernames[r] + "health:"+health[r],620,25);
						}else if(r==2){
							timerContext.fillText("Player "+ playernames[r] + "health:"+health[r],300,100);
						}else if(r==3){
							timerContext.fillText("Player "+ playernames[r] + "health:"+health[r],620,100);
						}
					}

				}else{
					window.location = 'http://cslinux.utm.utoronto.ca:10048/winner.html?winner='+playernames[winner];
				}
			}
			
			$(function(){
				$('#timer').hide();
				$('#road').hide();
			});
			
