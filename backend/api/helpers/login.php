<?php 

require_once("../../db/db_connection.php");

function login($user) {
    try {
        $db = new DB();
        $connection = $db->getConnection();
        
        $select = "SELECT id, password_hash 
                    FROM users 
                    WHERE email = :email";
    
        $stmt = $connection->prepare($select);
        $stmt->execute(["email" => $user["email"]]);
    
        if ($stmt->rowCount() == 0) {
            return ["status" => "ERROR", "message" => "No such user in the database!", "code" => 400];
        }
    
        $db_user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if (!password_verify($user["password"], $db_user["password_hash"])) {
            return ["status" => "ERROR", "message" => "Паролата, която сте въвели е грешна!", "code" => 400];
        }
    } 
    catch (PDOException $e) {
        return ["status" => "ERROR", "message" => $e, "code" => 500];
    }

    session_start();
    $_SESSION["user"] = $db_user;
    
    // set cookies
    setcookie("email", $user["email"], time() + 900, "/");
    setcookie("password", $user["password"], time() + 900, "/");

    return ["status" => "SUCCESS", "message" => "Добре дошли!", "code" => 200];
}

?>
