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

$room_id = $room_data["id"];

$response = deleteRoom($room_id);

http_response_code($response["code"]);
exit(json_encode(["status" => $response["status"], "message" => $response["message"]]));

?>

~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                        
