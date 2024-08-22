<?php

namespace App\Models;

class Galleries extends AbstractModel
{
    public function getGalleryByProductId($Id)
    {
        $sql = "SELECT * FROM Galleries WHERE product_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
