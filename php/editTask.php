<?php

$response = array();

require_once __DIR__ . '/db_connect.php';

$db = new DB_CONNECT();

session_start();

$user_id = $_SESSION["user_id"];

$idToEdit = $_POST["id"];
$courseID = $_POST["courseID"];
if ($courseID == -1) {
    $result = mysql_query("Select Users_PrivateTasks.index,name, date(due_date) as date1, time(due_date) as time1, description, difficulty From Users_PrivateTasks Where Users_PrivateTasks.index=$idToEdit");
} else {
    $result = mysql_query("Select Tasks.index,name, date(due_date) as date1, time(due_date) as time1, description, difficulty From Tasks Where Tasks.index=$idToEdit");
}
$response["debug"] = $courseID;
$response["tasks"] = array();

if (mysql_num_rows($result) == 1) {
    $row = mysql_fetch_array($result);

    $task = array();
    $task["index"] = $row["index"];
    $task["name"] = $row["name"];
    $task["date"] = $row["date1"];
    $task["time"] = $row["time1"];
    $task["difficulty"] = $row["difficulty"];
    $task["description"] = $row["description"];

    array_push($response["tasks"], $task);
    $response["success"] = 1;
} else {
    $response["success"] = 0;
    $response["message"] = "No tasks found";
}

echo json_encode($response);
?>

