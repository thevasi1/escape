<?php 

session_start();

$_SESSION = array(); // clear it
if (isset($_COOKIE["password"])) {
    unset($_COOKIE["password"]);
    setcookie("password", null, time() - 3600, "/");
}

if (isset($_COOKIE["email"])) {
    unset($_COOKIE["email"]);
    setcookie("email", null, time() - 3600, "/");
}

if (session_destroy()) {
    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "message" => "Success!"]));
}
else {
    http_response_code(500);
    exit(json_encode(["status" => "ERROR", "message" => "Logout failed"]));
}

?>
