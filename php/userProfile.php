<?php

require_once __DIR__ . '/db_connect.php';

$db = new DB_CONNECT();

$result = mysql_query("select distinct name from Schools order by name");

while ($row = mysql_fetch_array($result)) {
    $school["name"] = $row["name"];
    $schools[] = $school;
}

if (isset($_POST["dataUser"])) {
    session_start();

    $user_id = $_SESSION["user_id"];

    // change degree or year
    if (isset($_POST["field"]) && $_POST["field"] != "institue") {
        $value = $_POST["value"];
        $field = $_POST["field"];
        if($field == "degree"){
           $field = "School_id";
        }
        mysql_query("update Users set `$field`=$value where Users.index=$user_id");
        
    // change school
    } elseif (isset($_POST["field"]) && $_POST["field"] == "institue") {
        $value = urldecode($_POST["value"]);

        $result = mysql_query("select `index` from Schools where name='$value' order by degree");
        $row = mysql_fetch_array($result);
        $index = $row["index"];

        mysql_query("update Users set `School_id`=$index where Users.index=$user_id");
    }

    $result_users = mysql_query("select first_name,last_name,name,year,degree from Schools join Users on Users.school_id=Schools.index where Users.index=$user_id");
    $row_user = mysql_fetch_array($result_users);
    $name = $row_user["name"];

    $response["user_name"] =$row["first_name"] + " " + $row["last_name"];
    $response["user_school"] = $row_user["name"];
    $response["user_year"] = $row_user["year"];
    $response["user_degree"] = $row_user["degree"];
} else {
    
}

$result = mysql_query("select `index`,degree from Schools where name='" . $name . "' order by degree");
while ($row = mysql_fetch_array($result)) {
    $degree["name"] = $row["degree"];
    $degree["index"] = $row["index"];
    $degrees[] = $degree;
}
$response["schools"] = $schools;
$response["degrees"] = $degrees;
$response["success"] = 1;



echo json_encode($response);
?>