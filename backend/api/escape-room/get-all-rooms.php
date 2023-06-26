<?php

require_once("../helpers/validate_json.php");
require_once("../helpers/escape-rooms/cruds.php");

$input_data = file_get_contents("php://input");

$response = getAllRooms();

http_response_code($response["code"]);
exit(json_encode(["status" => $response["status"], "message" => $response["message"]]));

?>

~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                                                                                                                                                             
~                                                        
