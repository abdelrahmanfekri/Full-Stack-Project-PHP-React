import React from "react";
import { Link, useLocation } from "react-router-dom";
import client from "../apollo/apolloClient";
import { GET_CATEGORIES, GET_PRODUCTS } from "../apollo/queries";
import { withCartContext } from "../context/CartContext";

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
      client.query({ query: GET_CATEGORIES }).then((result) => {
        category = result.data.categories[0].name;
        this.fetchProductsCategory(category);
      });
    } else {
      this.fetchProductsCategory(category);
    }
  };

  fetchProductsCategory = (category) => {
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

  addToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultAttributes = {};
    product.attributes.forEach((attr) => {
      defaultAttributes[attr.id] = attr.items[0].id;
    });
    const { cartContext } = this.props;
    cartContext.addToCart(product, defaultAttributes);
  };

  renderProductCard = (product) => {
    const kebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-");

    return (
      <Link
        to={`/product/${product.id}`}
        key={product.id}
        className="relative group"
        data-testid={`product-${kebabCase(product.name)}`}
      >
        <div className="relative">
          <img
            src={product.gallery[0]}
            alt={product.name}
            className={`w-full h-64 object-cover ${
              !product.inStock && " opacity-50"
            }`}
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 opacity-20">
              <span className="text-2xl font-bold">OUT OF STOCK</span>
            </div>
          )}
          {product.inStock && (
            <button
              className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => this.addToCart(e, product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2">
          <h3 className="text-lg">{product.name}</h3>
          <p className="text-gray-600">
            ${product.prices[0].amount.toFixed(2)}
          </p>
        </div>
      </Link>
    );
  };

  render() {
    return (
      <div className="container mx-auto p-4 mb-32">
        <h1 className="text-3xl font-bold my-8">
          {(this.props.location.pathname.split("/")[1] || "all").toUpperCase()}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-32">
          {this.state.products.map(this.renderProductCard)}
        </div>
      </div>
    );
  }
}

function HomeWrapper(props) {
  const location = useLocation();
  return <Home {...props} location={location} />;
}

export default withCartContext(HomeWrapper);
