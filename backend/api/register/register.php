<?php 

require_once("../../db/db_connection.php");
require_once("../helpers/validate_json.php");

$data = file_get_contents("php://input");

$user_data;
if (strlen($data) > 0 && is_valid_json($data)) {
    $user_data = json_decode($data, true);
} else {
    http_response_code(400);
    exit(json_encode(["status" => "ERROR", "message" => "The input is not a correct JSON!"]));
}


$username = $user_data["username"];
$email = $user_data["email-register"]; 
$password = $user_data["password-register"]; 
$hashed_password = password_hash($password, PASSWORD_DEFAULT); // hash the input password

try {
    $db = new DB();
    $connection = $db->getConnection();
    
    $search = "SELECT * 
               FROM users 
               WHERE email = :email";

    $stmt = $connection->prepare($search);
    $stmt->execute(["email" => $email]);

    if ($stmt->rowCount() != 0) {
        http_response_code(400);
        exit(json_encode(["status" => "ERROR", "message" => "There input email is already in use!"]));
    }
} catch (PDOException $e) {
    http_response_code(500);
    return json_encode(["status" => "ERROR", "message" => "Server error!"]);
}

try {
    $insert = "INSERT INTO users (username, email, password)
                      VALUES (:username, :email, :password)";

    $stmt = $connection->prepare($insert);
    
    if ($stmt->execute(["username" => $username, "email" => $email, "password" => $hashed_password])) {
        
        $user_id = $connection->lastInsertId(); 

        session_start();
        $user = array("id" => $user_id, "username" => $username,"email" => $email, "password" => $hashed_password);
        $_SESSION["user"] = $user;

        setcookie("email", $email, time() + 900);
        setcookie("password", $password, time() + 900);
        

        http_response_code(200);
        exit(json_encode(["status" => "SUCCESS", "message" => "Registration is successful!"]));
    }
    else {
        http_response_code(500);
        exit(json_encode(["status" => "ERROR", "message" => "Server error!"]));
    } 
} catch (PDOException $e) {
    http_response_code(500);
    exit(json_encode(["status" => "ERROR", "message" => "Server error!"]));
}

?>

