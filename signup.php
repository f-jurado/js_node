<?php
    session_save_path('sessions');
    session_start();
	if(isset($_SESSION['logged'])){
        header("Location: index.php");
        die();
    }
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Signup</title>
		<meta charset="UTF-8">
	</head>
	<body>
		<p> Create a new Account</p>
		<form method="post" enctype="multipart/form-data" action="save.php">
			Username:<br>
		<input type="text" name="fname"><br>
			Password:<br>
		<input type="text" name="password">
		<input type="submit" value="submit">
		</form>
	</body>
</html>
