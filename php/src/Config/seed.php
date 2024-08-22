<?php

use App\Config\Database;

$sql_seed = file_get_contents('seed.sql');

if (!$sql_seed) {
    die("Failed to read seed file");
}

$conn = Database::getConnection();

if (mysqli_multi_query($conn, $sql_seed)) {
    echo "Seed data applied successfully";
} else {
    echo "Error applying seed data: " . mysqli_error($conn);
}

mysqli_close($conn);
