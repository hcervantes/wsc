<?php 

$host="localhost"; // Host name 
$username="hcervant_hmc"; // Mysql username 
$password="edwin1998"; // Mysql password 
$db_name="hcervant_db"; // Database name 
$tbl_name="WCSProfiles"; // Table name 

// Get values from form 
$profileID=$_POST['profileID'];
// Connect to server and select database.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");

$delSQL = "DELETE FROM $tbl_name WHERE ID=$profileID";
$result=mysql_query($delSQL);
// if successfully insert data into database, displays message "Successful". 
if($result){
	$msg = "{
			    success:true, 
			    message:'Profile deleted successfully',
			}";	
}

else {
	$msg ="{
		    success:false, 
		    message:'Profile $profileName NOT deleted'
		}";
}
echo $msg;
 ?>