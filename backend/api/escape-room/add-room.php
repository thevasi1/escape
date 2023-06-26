<?php 

require_once("../helpers/validate_json.php");
require_once("../helpers/escape-rooms/cruds.php");

$input_data = file_get_contents("php://input");
$room_data;

if (strlen($input_data) > 0 && is_valid_json($input_data)) {
    $room_data = json_decode($input_data, true);
}
else {
    http_response_code(400);
    exit(json_encode(["status" => "ERROR", "message" => "The json is in invalid format!"]));
}

$room_id = $room_data["room_id"];
$room_name = $room_data["room_name"];
$room_lang = $room_data["room_lang"];
$room_complexity = $room_data["room_complexity"];
$tasks = $room_data["tasks"];
$room = ["room_id" => $room_id, "room_name" => $room_name, "room_lang" => $room_lang, "room_complexity" => $room_complexity, "tasks" => $tasks];

$response = addRoom($user);

http_response_code($response["code"]);
exit(json_encode(["status" => $response["status"], "message" => $response["message"]]));

?>

