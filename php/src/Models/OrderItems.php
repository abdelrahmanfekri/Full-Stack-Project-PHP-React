<?php

namespace App\Models;

class OrderItems extends AbstractModel
{
    public function getItemsByOrderId($Id)
    {
        $sql = "SELECT * FROM OrderItems WHERE order_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function createOrderItem($OrderItem, $OrderId)
    {
        $sql = "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("ssss", $OrderId, $OrderItem['product_id'], $OrderItem['quantity'], $OrderItem['price']);
        $stmt->execute();
        $inserted_id = $this->db->insert_id;
        foreach ($OrderItem['attributes'] as $attribute) {
            DataSource::createOrderItemAttr($attribute, $inserted_id);
        }
        return $inserted_id;
    }
}
