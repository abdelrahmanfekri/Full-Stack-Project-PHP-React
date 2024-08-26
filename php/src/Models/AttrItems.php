<?php

namespace App\Models;

class AttrItems extends AbstractModel
{

    public function getItemByProductAttrId($pk)
    {
        $sql = "SELECT * FROM AttributesItems WHERE attribute_id = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bind_param("s", $pk);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
