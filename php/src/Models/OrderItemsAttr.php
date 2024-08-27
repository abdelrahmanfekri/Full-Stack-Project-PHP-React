<?php

namespace App\Models;

class OrderItemsAttr extends AbstractModel
{
    public function getOrderItemAttrByOrderItemId($Id)
    {
        $sql = "SELECT * FROM OrderItemAttr WHERE order_item_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public function createOrderItemAttr($OrderItemAttr, $OrderItemId)
    {
        $sql = "INSERT INTO OrderItemAttr (order_item_id, attribute_id, value) VALUES (?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("sss", $OrderItemId, $OrderItemAttr['attribute_id'], $OrderItemAttr['value']);
        $stmt->execute();
        $inserted_id = $this->db->insert_id;
        return $inserted_id;
    }
}
