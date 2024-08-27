<?php

namespace App\Config;

use mysqli;
use Exception;

class Database
{
    private static $conn;

    public static function connect()
    {
        $host = getenv('DB_HOST') ?: '127.0.0.1';
        $db = getenv('DB_NAME') ?: 'testdb';
        $user = getenv('DB_USER') ?: 'testuser';
        $pass = getenv('DB_PASS') ?: 'testpass';
        self::$conn = new mysqli($host, $user, $pass, $db);
        if (self::$conn->connect_error) {
            throw new Exception("Connection failed: " . self::$conn->connect_error);
        }
        self::$conn->set_charset("utf8mb4");
        error_log("Connected successfully \n");
    }

    public static function getConnection()
    {
        if (!self::$conn) {
            self::connect();
        }
        error_log("Returning connection \n");
        return self::$conn;
    }
}
