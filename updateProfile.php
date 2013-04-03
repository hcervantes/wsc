<?php

$host="localhost"; // Host name 
$username="hcervant_hmc"; // Mysql username 
$password="edwin1998"; // Mysql password 
$db_name="hcervant_db"; // Database name 
$tbl_name="WCSProfiles"; // Table name 

// Connect to server and select database.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");

// Get values from form 
$profileName=$_POST['profileName'];
$HNPR=$_POST['HNatPixRate'];
$VNPR=$_POST['VNatPixRate'];
$distance =$_POST['distance'];
$hsize =$_POST['hsize'];
$lens =$_POST['lens'];
$numprojectors =$_POST['numprojectors'];
$spyOpMonH =$_POST['spyOpMonH'];
$spyOpMonV =$_POST['spyOpMonV'];
$vhff =$_POST['vhff'];
$vsize =$_POST['vsize'];

// Insert data into mysql 
$sql="INSERT INTO $tbl_name(ProfileName, HSize, VSize, VHFF, HNPR, VNPR, NumProjector, HOpMon, VOpMon)
					VALUES('$profileName', $hsize, $vsize, $vhff, $HNPR, $VNPR, $numprojectors, $spyOpMonH, $spyOpMonV )";
$result=mysql_query($sql);


// if successfully insert data into database, displays message "Successful". 
if($result){
	$id = mysql_insert_id();
	$msg = "{
			    success:true, 
			    message:'Profile $profileName Saved',
			    pkid: $id
			}";	
}

else {
	$msg ="{
		    success:false, 
		    message:'Profile $profileName NOT Saved'
		}";
}
echo $msg;
?> 

<?php 
// close connection 
mysql_close();
?>