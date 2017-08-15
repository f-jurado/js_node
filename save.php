<?php

	session_save_path('sessions');
	session_start();
	//if logged in through database
	$dbconn = pg_connect("host=localhost dbname=chowdhr8 user=chowdhr8 password=4886400")
	  or die('Could not connect: ' . pg_last_error());
	if(isset($_POST['fname'])){
		if(isset($_POST['password'])){
			$u=$_POST['fname'];
			$p=$_POST['password'];
			$user = pg_escape_string($u);
			$pwd = pg_escape_bytea(md5($p));	
			$result = pg_query($dbconn, "SELECT * FROM users where name='". $user ."'");
			if(!$result){
				echo "<script>
				alert('Query Error. Please check username and password are correct.');
				window.location.href='signup.php';
				</script>";				
			}
			if(pg_num_rows($result)<1) {	
				pg_query($dbconn, "INSERT INTO users(name, password) VALUES('" . $user . "','" . $pwd . "');");
				$_SESSION['name'] = $user; 
				header('Location: index.php');
				die();		
			}
			pg_close($dbconn);
		}else{
			die();
		}		
	}

?>
