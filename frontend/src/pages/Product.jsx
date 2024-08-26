import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo/apolloClient";

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
      selectedSize: "S",
      selectedColor: "gray",
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split("/")[2];
    console.log(id);
    client.query({ query: GET_PRODUCT, variables: { id } }).then((result) => {
      this.setState({ product: result.data.product });
    });
  }

  addToCart = () => {
    const { product, selectedSize, selectedColor } = this.state;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  render() {
    const { product, selectedSize, selectedColor } = this.state;

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
                className="mb-4 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-5/12 relative">
            <img
              src={product.gallery[0]}
              alt={product.name}
              className="w-full"
            />
          </div>

          <div className="w-5/12 ml-8">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            {product?.attributes?.map((attr) => (
              <div className="mb-4">
                <h2 className="font-bold mb-2">{attr.name.toUpperCase()}:</h2>
                <div className="flex space-x-2">
                  {attr.items.map((item) => (
                    <button
                      key={item.id}
                      className={`border px-3 py-1 ${
                        selectedSize === item.value
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        this.setState({ selectedSize: item.value })
                      }
                    >
                      {item.displayValue}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="mb-4">
              <h2 className="font-bold mb-2">PRICE:</h2>
              <p className="text-2xl">${product.prices[0].amount.toFixed(2)}</p>
            </div>

            <button
              className="w-full bg-green-500 text-white py-3 font-bold"
              onClick={this.addToCart}
            >
              ADD TO CART
            </button>

            <p
              className="mt-4 text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
