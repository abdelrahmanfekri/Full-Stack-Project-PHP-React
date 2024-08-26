<?php

namespace App\Controller;

use App\Models\DataSource;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

class GraphQL
{

    static public function handle()
    {
        try {
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => [
                    'categories' => [
                        'type' => Type::listOf(Types::$categoryType),
                        'resolve' => function () {
                            return DataSource::getCategory();
                        }
                    ],
                    'products' => [
                        'type' => Type::listOf(Types::$productType),
                        'args' => [
                            'category' => Type::string(),
                        ],
                        'resolve' => function ($root, $args, $context) {
                            if (isset($args['category'])) {
                                return DataSource::getProductsByCategory($args['category']);
                            }
                            return DataSource::getProducts();
                        }
                    ],
                    'product' => [
                        'type' => Types::$productType,
                        'args' => [
                            'id' => Type::nonNull(Type::string()),
                        ],
                        'resolve' => function ($root, $args, $context) {
                            return DataSource::getProductById($args['id']);
                        }
                    ]
                ]
            ]);
            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                ],
            ]);

            // See docs on schema options:
            // https://webonyx.github.io/graphql-php/schema-definition/#configuration-options
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}
