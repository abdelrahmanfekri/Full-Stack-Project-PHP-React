<?php

namespace App\Config;

use mysqli;
use Exception;

class Database
{
    private static $conn;

    private static function connect()
    {
        $host = "127.0.0.1";
        $db = "testdb";
        $user = "testuser";
        $pass = "testpass";
        self::$conn = new mysqli($host, $user, $pass, $db);
        if (self::$conn->connect_error) {
            throw new Exception("Connection failed: " . self::$conn->connect_error);
        }
        self::$conn->set_charset("utf8mb4");
        echo "Connected successfully \n";
    }

    public static function getConnection()
    {
        if (!self::$conn) {
            self::connect();
        }
        echo "Returning connection \n";
        return self::$conn;
    }
}
