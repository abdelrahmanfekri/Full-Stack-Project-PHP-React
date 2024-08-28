import React from "react";
import client from "../apollo/apolloClient";
import parse from "html-react-parser";
import { GET_PRODUCT } from "../apollo/queries";
import { withCartContext } from "../context/CartContext";

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
      const { product } = result.data;
      this.setState({ product });
      const selectedAttributes = {};
      product.attributes.forEach((attribute) => {
        selectedAttributes[attribute.id] = null;
      });
      this.setState({ selectedAttributes });
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
    this.props.cartContext.addToCart(product, selectedAttributes);
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
                  data-testid={`product-attribute-${kebabCase(
                    attribute.name
                  )}-${item.value}`}
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
                  data-testid={`product-attribute-${kebabCase(
                    attribute.name
                  )}-${item.value}`}
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
      <div className="container mx-auto px-4 my-20">
        <div className="flex flex-col md:flex-row mt-8">
          <div
            className="flex md:w-7/12"
            style={{
              height: "400px",
            }}
          >
            <div className="w-2/12 mr-4 overflow-y-auto scrollbar-hide">
              {product.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={`mb-4 cursor-pointer object-contain w-full h-20 ${
                    currentImageIndex === index ? "border-2 border-black" : ""
                  }`}
                  onClick={() => this.changeImage(index)}
                />
              ))}
            </div>

            <div className="w-10/12 relative" data-testid="product-gallery">
              <img
                src={product.gallery[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {product.gallery.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2"
                    onClick={() =>
                      this.changeImage(
                        (currentImageIndex - 1 + product.gallery.length) %
                          product.gallery.length
                      )
                    }
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="31.6978"
                        height="31.6978"
                        transform="matrix(0.999953 0.00966993 -0.00948818 0.999955 0.300781 0)"
                        fill="black"
                        fill-opacity="0.73"
                      />
                      <path
                        d="M18.9687 8.16618L11.5396 15.5875L18.9687 23.0088"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2"
                    onClick={() =>
                      this.changeImage(
                        (currentImageIndex + 1) % product.gallery.length
                      )
                    }
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        transform="matrix(-1 0 0 1 32 0)"
                        fill="black"
                        fill-opacity="0.73"
                      />
                      <path
                        d="M13 8.09158L20.5 15.5836L13 23.0757"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="ml-8 md:w-5/12 ">
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

export default withCartContext(ProductDetail);
