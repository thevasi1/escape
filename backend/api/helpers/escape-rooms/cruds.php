<?php 

require_once("../../../db/db_connection.php");

function addRoom($room) {
        $db = new DB();
        $connection = $db->getConnection();
    try {
	$connection->beginTransaction();
	$insert = "INSERT IGNORE INTO room (name, lang, complexity, owner_id) VALUES
  (:name, :lang, :complexity, :owner_id )";
    
        $stmt = $connection->prepare($insert);
        $stmt->execute(["name" => $room["name"], "lang" => $room["lang"], "complexity" => $room["complexity"], "owner_id" => $room["owner_id"]);
    
        if ($stmt->affected_rows  > 0) {
            return ["status" => "ERROR", "message" => "Can't create room!", "code" => 400];
	  }

	$roomId = $connection->lastInsertId();
	$insert_task = "INSERT INTO tasks (room_id, type, solution, mssg) VALUES (:room_id, :type, :solution, :mssg)";
	$stmt = $connection->prepare($insert_task);
	$tasks = $room["tasks"];

	foreach($tasks as $task) {
		$type = $task["type"];
		$solution = $task["solution"]
		$mssg = $task["mssg"]

		$stmt->execute(["room_id" => $roomId, "type" => $type, "solution" => $solution, "mssg" => $mssg]);
	}

	$connection->commit();
    } 
    catch (PDOException $e) {
	$connection->rollback();
        return ["status" => "ERROR", "message" => "Couldn't add room!", "code" => 500];
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
        $select = "SELECT * FROM room";

        $stmt = $connection->prepare($select);
        $stmt->execute();
    	$rooms = $stmt->fetch(PDO::FETCH_BOTH); 

    	return ["status" => "SUCCESS", "message" => json_encode($rooms), "code" => 200];
        $connection->commit();
    }
    catch (PDOException $e) {
        $connection->rollback();
        return ["status" => "ERROR", "message" => "Couldn't fetch all rooms!", "code" => 500];
    }

    return ["status" => "SUCCESS", "message" => "Success!", "code" => 200];

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

