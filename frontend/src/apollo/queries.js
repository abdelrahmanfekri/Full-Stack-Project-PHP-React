import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProductByCategory($category: String!) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        items {
          id
          value
          displayValue
        }
        type
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

export const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        items {
          id
          value
          displayValue
        }
        type
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;
