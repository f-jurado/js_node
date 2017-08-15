<?php
	session_start();
	require_once 'vendor/autoload.php';
	Facebook\FacebookSession::setDefaultApplication('674947055981250','02e457125cd9e4e07bed65abb79b5ea4');
	$facebook =  new Facebook\FacebookRedirectLoginHelper('https://cs.utm.utoronto.ca/~chowdhr8/HighwayShowdown');
	
?>