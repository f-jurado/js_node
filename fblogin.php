<?php
	session_save_path('sessions');
	session_start();
	header('Content-Type: application/json');
	$dbconn=pg_connect("host=localhost dbname=chowdhr8 user=chowdhr8 password=4886400")
          or die('Could not connect: ' . pg_last_error());
		$fuser = $_REQUEST['user'];
		$fbuser=pg_escape_string($fuser);
		$result = pg_query($dbconn, "SELECT * FROM fbusers where name='". $fbuser ."'");
		if(!$result){
			echo "<script>
			alert('Query Error. Please check username and password are correct.');
			window.location.href='signup.php';
			</script>";				
		}
		if(pg_num_rows($result)<1) {	
			pg_query($dbconn, "INSERT INTO fbusers(name) VALUES('" . $fbuser . "');");	
		}
		$_SESSION['user'] = $fbuser; 
		pg_close($dbconn);
		header('Location: index.php');
		die();	
?>
