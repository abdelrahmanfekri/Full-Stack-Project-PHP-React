<?php

namespace App\Models;

class Orders extends AbstractModel
{
    public function getOrderById($Id)
    {
        $sql = "SELECT * FROM Orders WHERE id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc(MYSQLI_ASSOC);
    }

    public function getOrders()
    {
        $sql = "SELECT * FROM Orders";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function createOrder($Order)
    {
        $sql = "INSERT INTO Orders () VALUES ()";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $inserted_id = $this->db->insert_id;
        foreach ($Order['items'] as $item) {
            DataSource::createOrderItem($item, $inserted_id);
        }
        return $inserted_id;
    }
}
