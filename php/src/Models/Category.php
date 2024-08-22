<?php

namespace App\Models;

class Category extends AbstractModel
{
    public function getAll()
    {
        $sql = "SELECT * FROM Categories";
        $result = $this->db->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}
