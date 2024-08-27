import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($items: [OrderItemInput!]!) {
    createOrder(order: { items: $items })
  }
`;
