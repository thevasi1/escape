<?php
require_once 'db_connection.php'; // Assuming the Db class is defined in the "Db.php" file

// Create an instance of the Db class
$db = new Db();

// Get the database connection
$connection = $db->getConnection();

// Perform the query
$query = "SELECT * FROM users";
$statement = $connection->query($query);
$results = $statement->fetchAll();

// Output the results
foreach ($results as $row) {
    echo "User ID: " . $row['id'] . "<br>";
    echo "Username: " . $row['username'] . "<br>";
    echo "Email: " . $row['email'] . "<br>";
    echo "<br>";
}
?>

