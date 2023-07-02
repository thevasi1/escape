<?php 

//TODO: change this to relative path
require_once('C:uni\web\htdocs\escape-rooms\backend\db\db_connection.php');

function addRoom($room) {
        session_start();
        if(isset($_SESSION['user'])){

            $user = $_SESSION['user'];
            $user_id = $user['id'];
        }
        else {

            return ["status" => "ERROR", "message" => "User not logged in", "code" => 401];
        }
        $db = new DB();
        $connection = $db->getConnection();
    try {
	$connection->beginTransaction();
	$insert = "INSERT INTO room (name, lang, complexity, owner_id) VALUES
  (:name, 'en', :complexity, :owner_id)";
    
        $stmt = $connection->prepare($insert);
        $stmt->execute(["name" => $room["room_name"], "complexity" => $room["room_complexity"], "owner_id" => $user_id ]);
    
        if ($stmt->rowCount()  == 0) {
            return ["status" => "ERROR", "message" => $room["room_name"], "code" => 400];
	  }

	$roomId = $connection->lastInsertId();
	$insert_task = "INSERT INTO tasks (room_id, type, solution, mssg) VALUES (:room_id, :type, :solution, :mssg)";
	$stmt = $connection->prepare($insert_task);
	$tasks = $room["tasks"];

	foreach($tasks as $task) {
		$type = $task["type"];
		$solution = $task["solution"];
		$mssg = $task["mssg"];

		$stmt->execute(["room_id" => $roomId, "type" => $type, "solution" => $solution, "mssg" => $mssg]);
	}

	$connection->commit();
    } 
    catch (PDOException $e) {
	$connection->rollback();
        return ["status" => "ERROR", "message" => $e, "code" => 500];
    }

    return ["status" => "SUCCESS", "message" => "Success!", "code" => 200];
}

function deleteRoom($roomId) {
	$db = new DB();
        $connection = $db->getConnection();
    try {
        $connection->beginTransaction();
        $delete = "DELETE FROM room WHERE id = :room_id";

        $stmt = $connection->prepare($delete);
        $stmt->execute(["name" => $roomId]);

        if ($stmt->affected_rows  > 0) {
            return ["status" => "ERROR", "message" => "No such room in the database!", "code" => 400];
          }

        $connection->commit();
    }
    catch (PDOException $e) {
        $connection->rollback();
        return ["status" => "ERROR", "message" => "Couldn't delete room!", "code" => 500];
    }

    return ["status" => "SUCCESS", "message" => "Success!", "code" => 200];

}

function getAllRooms() {
	$db = new DB();
        $connection = $db->getConnection();
    try {
        $connection->beginTransaction();
        $select = "SELECT * FROM `room`";

        $stmt = $connection->prepare($select);
        $stmt->execute();
    	$rooms = $stmt->fetchAll(PDO::FETCH_ASSOC); 

        $connection->commit();
    	return ["status" => "SUCCESS", "message" => json_encode($rooms), "code" => 200];
    }
    catch (PDOException $e) {
        $connection->rollback();
        return ["status" => "ERROR", "message" => "Couldn't fetch all rooms!", "code" => 500];
    }
}

function getRoom($room_id) {
        $db = new DB();
        $connection = $db->getConnection();
    try {
        $connection->beginTransaction();
        $select = "SELECT * FROM room where id = :id";

	$stmt = $connection->prepare($select);
	
        $stmt->execute(["id" => $room_id]);
        $room = $stmt->fetch(PDO::FETCH_ASSOC);

        return ["status" => "SUCCESS", "message" => json_encode($room), "code" => 200];
        $connection->commit();
    }
    catch (PDOException $e) {
        $connection->rollback();
        return ["status" => "ERROR", "message" => "Couldn't fetch all rooms!", "code" => 500];
    }

    return ["status" => "SUCCESS", "message" => "Success!", "code" => 200];

}

?>

