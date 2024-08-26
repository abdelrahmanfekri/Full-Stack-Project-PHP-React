import React from "react";
import { gql } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import client from "../apollo/apolloClient";

const GET_PRODUCTS = gql`
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    let category = this.props.location.pathname.split("/")[1];

    if (category === "") {
      category = "all";
    }
    client
      .query({ query: GET_PRODUCTS, variables: { category: category } })
      .then((result) => {
        this.setState({ products: result.data.products });
      });
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchProducts();
    }
  }

  render() {
    return (
      <div className="container mx-auto p-4 mb-32">
        <h1 className="text-3xl font-bold my-8">
          {(this.props.location.pathname.split("/")[1] || "all").toUpperCase()}
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {this.state.products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="relative shadow-md p-4"
            >
              <img
                src={product.gallery[0]}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="mt-2">
                <h3 className="text-lg">{product.name}</h3>
                <p className="text-gray-600">
                  ${product.prices[0].amount.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
function HomeWrapper(props) {
  const location = useLocation();
  return <Home {...props} location={location} />;
}

export default HomeWrapper;
