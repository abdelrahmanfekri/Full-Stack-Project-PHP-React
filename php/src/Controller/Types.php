<?php

namespace App\Controller;

use App\Models\DataSource;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;


class Types
{
    public static $categoryType;
    public static $productType;
    public static $currencyType;
    public static $attributeItemType;
    public static $attributeSetType;
    public static $priceType;


    public static function init()
    {
        $currencyType = new ObjectType([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::string(),
                'symbol' => Type::string(),
            ]
        ]);

        $attributeItemType = new ObjectType([
            'name' => 'AttributeItem',
            'fields' => [
                'displayValue' => [
                    'type' => Type::string(),
                    'resolve' => fn($rootValue) => $rootValue['display_value']
                ],
                'value' => Type::string(),
                'id' => Type::string(),
            ]
        ]);

        $attributeSetType = new ObjectType([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::string(),
                'items' => [
                    'type' => Type::listOf($attributeItemType),
                    'resolve' => function ($rootValue) {
                        $result = DataSource::getAttrItemsByAttrId($rootValue['pk']);
                        return $result;
                    }
                ],
                'name' => Type::string(),
                'type' => Type::string(),
            ]
        ]);

        $priceType = new ObjectType([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::float(),
                'currency' => [
                    'type' => $currencyType,
                    'resolve' => function ($rootValue) {
                        return DataSource::getCurrencyById($rootValue['currency_id']);
                    }
                ],
            ]
        ]);

        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'gallery' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => function ($rootValue) {
                        $result = [];
                        $fetchResult = DataSource::getGalleriesByProductId($rootValue['id']);
                        foreach ($fetchResult as $value) {
                            $result[] = $value['image_url'];
                        }
                        return $result;
                    }
                ],
                'description' => Type::string(),
                'category' => Type::string(),
                'attributes' => [
                    'type' => Type::listOf($attributeSetType),
                    'resolve' => function ($rootValue) {
                        $result = DataSource::getAttributeByProductId($rootValue['id']);
                        return $result;
                    }
                ],
                'prices' => [
                    'type' => Type::listOf($priceType),
                    'resolve' => function ($rootValue) {
                        return DataSource::getPricesByProductId($rootValue['id']);
                    }
                ],
                'brand' => Type::string(),
            ]
        ]);
        $categoryType = new ObjectType([
            'name' => 'Category',
            'fields' => [
                'name' => Type::string(),
                'products' => [
                    'type' => Type::listof($productType),
                    'resolve' => function ($rootValue) {
                        return DataSource::getProductsByCategory($rootValue['name']);
                    }
                ]
            ]
        ]);
        self::$categoryType = $categoryType;
        self::$productType = $productType;
        self::$currencyType = $currencyType;
        self::$attributeItemType = $attributeItemType;
        self::$attributeSetType = $attributeSetType;
        self::$priceType = $priceType;
    }
}

Types::init();
