import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo/apolloClient";
import parse from "html-react-parser";

const GET_PRODUCT = gql`
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

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      selectedAttributes: {},
      currentImageIndex: 0,
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split("/")[2];
    client.query({ query: GET_PRODUCT, variables: { id } }).then((result) => {
      const product = result.data.product;
      const selectedAttributes = {};
      product.attributes.forEach((attr) => {
        selectedAttributes[attr.id] = null;
      });
      this.setState({ product, selectedAttributes });
    });
  }

  selectAttribute = (attributeId, itemId) => {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attributeId]: itemId,
      },
    }));
  };

  isAllAttributesSelected = () => {
    return Object.values(this.state.selectedAttributes).every(
      (value) => value !== null
    );
  };

  addToCart = () => {
    const { product, selectedAttributes } = this.state;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      ...product,
      selectedAttributes,
      quantity: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  changeImage = (index) => {
    this.setState({ currentImageIndex: index });
  };

  renderAttributeOptions = (attribute) => {
    const { selectedAttributes } = this.state;
    const kebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-");

    return (
      <div
        key={attribute.id}
        className="mb-4"
        data-testid={`product-attribute-${kebabCase(attribute.name)}`}
      >
        <h2 className="font-bold mb-2">{attribute.name.toUpperCase()}:</h2>
        <div className="flex space-x-2">
          {attribute.items.map((item) => {
            const isSelected = selectedAttributes[attribute.id] === item.id;
            if (attribute.type === "swatch") {
              return (
                <button
                  key={item.id}
                  className={`w-8 h-8 border-2 ${
                    isSelected ? "border-black" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: item.value }}
                  onClick={() => this.selectAttribute(attribute.id, item.id)}
                ></button>
              );
            } else {
              return (
                <button
                  key={item.id}
                  className={`border px-3 py-1 ${
                    isSelected ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => this.selectAttribute(attribute.id, item.id)}
                >
                  {item.displayValue}
                </button>
              );
            }
          })}
        </div>
      </div>
    );
  };

  render() {
    const { product, currentImageIndex } = this.state;

    if (!product) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container mx-auto px-4">
        <div className="flex mt-8">
          <div className="w-1/12 mr-4">
            {product.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`mb-4 cursor-pointer ${
                  currentImageIndex === index ? "border-2 border-black" : ""
                }`}
                onClick={() => this.changeImage(index)}
              />
            ))}
          </div>

          <div className="w-5/12 relative" data-testid="product-gallery">
            <img
              src={product.gallery[currentImageIndex]}
              alt={product.name}
              className="w-full"
            />
            {product.gallery.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-0 bg-white p-2"
                  onClick={() =>
                    this.changeImage(
                      (currentImageIndex - 1 + product.gallery.length) %
                        product.gallery.length
                    )
                  }
                >
                  &#8592;
                </button>
                <button
                  className="absolute top-1/2 right-0 bg-white p-2"
                  onClick={() =>
                    this.changeImage(
                      (currentImageIndex + 1) % product.gallery.length
                    )
                  }
                >
                  &#8594;
                </button>
              </>
            )}
          </div>

          <div className="w-5/12 ml-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            {product.attributes.map(this.renderAttributeOptions)}
            <div className="mb-4">
              <h2 className="font-bold mb-2">PRICE:</h2>
              <p className="text-2xl">${product.prices[0].amount.toFixed(2)}</p>
            </div>

            <button
              className={`w-full py-3 font-bold ${
                this.isAllAttributesSelected() && product.inStock
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={this.addToCart}
              disabled={!this.isAllAttributesSelected() || !product.inStock}
              data-testid="add-to-cart"
            >
              {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
            </button>

            <div
              className="mt-4 text-sm text-gray-600"
              data-testid="product-description"
            >
              {parse(product.description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
