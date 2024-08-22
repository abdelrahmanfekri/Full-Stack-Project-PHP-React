<?php

namespace App\Models;

class Attributes extends AbstractModel
{
    public function getAttrByProductId($Id)
    {
        $sql = "SELECT * FROM ProductAttributes WHERE product_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
