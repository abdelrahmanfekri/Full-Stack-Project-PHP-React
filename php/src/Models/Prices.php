<?php


namespace App\Models;

class Prices extends AbstractModel
{

    public function getProductPrices($Id)
    {

        $sql = "SELECT * FROM Prices WHERE product_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
