<?php

namespace App\Config;

$sql = file_get_contents('schema.sql');

if (!$sql) {
    die("Failed to read schema file");
}

$db = Database::getConnection();

if ($db->query($sql)) {
    echo "Schema applied successfully";
} else {
    echo "Error applying schema: " . $db->error;
}

$db->close();
