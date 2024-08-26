<?php

namespace App\Models;

use App\Config\Database;

class DataSource
{
    private static Attributes $attribute;
    private static AttrItems $attrItems;
    private static Category $category;
    private static Currency $currency;
    private static Galleries $galleries;
    private static Prices $prices;
    private static Product $product;
    private static OrderItemsAttr $orderItemAttr;
    private static OrderItems $orderItems;
    private static Orders $orders;
    public static function init()
    {
        $db = Database::getConnection();
        self::$attribute = new Attributes($db);
        self::$attrItems = new AttrItems($db);
        self::$category = new Category($db);
        self::$currency = new Currency($db);
        self::$galleries = new Galleries($db);
        self::$prices = new Prices($db);
        self::$product = new Product($db);
        self::$orderItemAttr = new OrderItemsAttr($db);
    }

    public static function getAttributeByProductId($Id)
    {
        return self::$attribute->getAttrByProductId($Id);
    }

    public static function getAttrItemsByAttrId($Id)
    {
        return self::$attrItems->getItemByProductAttrId($Id);
    }

    public static function getCategory()
    {
        return self::$category->getAll();
    }

    public static function getCurrencyById($id)
    {
        return self::$currency->getCurrencyById($id);
    }

    public static function getGalleriesByProductId($Id)
    {
        return self::$galleries->getGalleryByProductId($Id);
    }

    public static function getPricesByProductId($Id)
    {
        return self::$prices->getProductPrices($Id);
    }

    public static function getProducts()
    {
        return self::$product->getAll();
    }

    public static function getProductsByCategory($category)
    {
        if ($category === 'all') {
            return self::$product->getAll();
        }
        return self::$product->getByCategory($category);
    }

    public static function getProductById($Id)
    {
        return self::$product->getById($Id);
    }

    public static function getOrderItemAttrByOrderItemId($Id)
    {
        return self::$orderItemAttr->getOrderItemAttrByOrderItemId($Id);
    }

    public static function createOrderItemAttr($OrderItemAttr, $OrderItemId)
    {
        return self::$orderItemAttr->createOrderItemAttr($OrderItemAttr, $OrderItemId);
    }

    public static function createOrderItem($OrderItem, $OrderId)
    {
        return self::$orderItems->createOrderItem($OrderItem, $OrderId);
    }

    public static function getItemsByOrderId($Id)
    {
        return self::$orderItems->getItemsByOrderId($Id);
    }

    public static function createOrder($Order)
    {
        return self::$orders->createOrder($Order);
    }
}
