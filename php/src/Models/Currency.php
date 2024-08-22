<?php

namespace App\Models;

class Currency extends AbstractModel
{

    public function getCurrencyById($Id)
    {

        $sql = "SELECT * FROM Currencies Where id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
}
