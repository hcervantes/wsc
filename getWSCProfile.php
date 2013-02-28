<?php 

  $format = strtolower($_GET['format']) == 'json' ? 'json' : 'xml'; //xml is the default

  /* connect to the db */
  $link = mysql_connect('localhost','hcervant_hmc','edwin1998') or die('Cannot connect to the DB b/c bad user/passwd');
  mysql_select_db('hcervant_db',$link) or die('Cannot select the DB');

  /* grab the posts from the db */
  $query = "SELECT * FROM WCSProfiles";
  $result = mysql_query($query,$link) or die('Errant query:  '.$query);

  /* create one master array of the records */
  $profiles = array();
  if(mysql_num_rows($result)) {
    while($profile = mysql_fetch_assoc($result)) {
      $profiles[] = array('pro' => $profile);
    }
  }

  /* output in necessary format */
  if($format == 'json') {
    header('Content-type: application/json');
    echo json_encode(array('profiles'=>$profiles), JSON_NUMERIC_CHECK );
  }
  else {
    header('Content-type: text/xml');
    echo '<posts>';
    foreach($profiles as $index => $profile) {
      if(is_array($profile)) {
        foreach($profile as $key => $value) {
          echo '<',$key,'>';
          if(is_array($value)) {
            foreach($value as $tag => $val) {
              echo '<',$tag,'>',htmlentities($val),'</',$tag,'>';
            }
          }
          echo '</',$key,'>';
        }
      }
    }
    echo '</posts>';
  }

  /* disconnect from the db */
  @mysql_close($link);

 ?>