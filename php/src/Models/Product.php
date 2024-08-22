<?php

namespace App\Models;

class Product extends AbstractModel
{
    public function getAll()
    {
        $sql = "SELECT * FROM Products";
        $result = $this->db->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    public function getByCategory($category)
    {
        $sql = "SELECT * FROM Products WHERE category = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $category);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
