// Load the http module to create an http server.
var http = require('http');
var responsesSent=0;
var sessions ={};
var session_count = 0;


var server = http.createServer(function (request, response) {
	var responseHeader = {"Content-Type": "text/plain" }

	var session_id="";

	if('cookie' in request.headers){
		session_id = request.headers.cookie;
	} else {
	// like session_start();  in PHP
		session_id = session_count;
		session_count ++;
		responseHeader['Set-Cookie'] = session_id;
		sessions[session_id]={ 'secret' : Math.floor(Math.random()*10+1) }
	}

	query=require('url').parse(request.url, true).query; // like $_['REQUEST']

	var message="";
	// message += JSON.stringify(query);
	if('guess' in query){
		var guess = query.guess;
		var secret = sessions[session_id].secret;

		if(guess<secret){
			message+="low";
		}
		if(guess==secret){
			message+="correct";
		}
		if(guess>secret){
			message+="high";
		}
	}

	response.writeHead(200, responseHeader );
	response.end(message, function(){
		responsesSent++;
		console.log("sent "+responsesSent+" responses");
	});

});




	// message=JSON.stringify(request.headers);
	// message+=JSON.stringify(request.headers);



// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);
// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
