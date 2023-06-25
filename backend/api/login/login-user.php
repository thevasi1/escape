<?php 

require_once("../helpers/validate_json.php");
require_once("../helpers/login.php");

echo "php";
$input_data = file_get_contents("php://input");
$user_data;

if (strlen($input_data) > 0 && is_valid_json($input_data)) {
    $user_data = json_decode($input_data, true);
}
else {
    http_response_code(400);
    exit(json_encode(["status" => "ERROR", "message" => "The json is in invalid format!"]));
}

$email = $user_data["email-input"];
$password = $user_data["password-input"];
$user = ["email" => $email, "password" => $password];

$response = login($user);

http_response_code($response["code"]);
exit(json_encode(["status" => $response["status"], "message" => $response["message"]]));

?>
