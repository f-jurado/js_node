<?php
	session_save_path('sessions');
	session_start();
	if(isset($_POST['lname'])){
		$dbconn=pg_connect("host=localhost dbname=chowdhr8 user=chowdhr8 password=4886400") or die('Could not connect: ' . pg_last_error());
		$currUser = $_POST['lname'];
		$u = pg_escape_string($currUser);
		$p = pg_escape_string($_POST['lp']);
		$pass = pg_escape_bytea(md5($p));
		$result = pg_query($dbconn, "select * from users where name='" . $u . "' and password='" . $pass . "'");
		if(pg_num_rows($result) == 1){
			$row= pg_fetch_array($result, 0, PGSQL_NUM);
			$u= $row[0];
			$_SESSION['user'] = $u; 
			pg_close($dbconn);
			header("Location: http://cslinux.utm.utoronto.ca:10048/control.html?user=" . $u );
			die();
		}
		else{
			echo "<script>
				alert('Wrong login information.');
				</script>";
			header("Location: login.php");
			die();
		}

		pg_close($dbconn);
	}else{
		die();
	}
	
?>