import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation CreateOrder($items: [OrderItemInput!]!) {
    createOrder(order: { items: $items })
  }
`;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    this.loadCartItems();
  }

  loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    this.setState({ items });
  };

  toggleCart = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    if (!this.state.isOpen) {
      this.loadCartItems();
    }
  };

  renderColorOption(color) {
    const colorClasses = {
      gray: "bg-gray-400",
      black: "bg-black",
      green: "bg-green-500",
      orange: "bg-orange-500",
    };
    return (
      <div
        className={`w-4 h-4 rounded-full ${colorClasses[color]} border border-gray-300`}
      ></div>
    );
  }

  calculateTotal() {
    return this.state.items
      .reduce((total, item) => total + item.prices[0].amount * item.quantity, 0)
      .toFixed(2);
  }

  updateQuantity = (item, change) => {
    const updatedItems = this.state.items
      .map((i) =>
        i.id === item.id &&
        i.selectedSize === item.selectedSize &&
        i.selectedColor === item.selectedColor
          ? { ...i, quantity: Math.max(0, i.quantity + change) }
          : i
      )
      .filter((i) => i.quantity > 0);

    this.setState({ items: updatedItems }, () => {
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    });
  };

  removeItem = (item) => {
    const updatedItems = this.state.items.filter(
      (i) =>
        i.id !== item.id ||
        i.selectedSize !== item.selectedSize ||
        i.selectedColor !== item.selectedColor
    );
    this.setState({ items: updatedItems }, () => {
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    });
  };

  placeOrder = async () => {
    const orderItems = this.state.items.map((item) => ({
      quantity: item.quantity,
      product_id: item.id,
      price: item.prices[0].amount,
      attributes: Object.keys(item.selectedAttributes).map((key) => ({
        attribute_id: key,
        value: item.selectedAttributes[key],
      })),
    }));

    try {
      await this.props.createOrder({ variables: { items: orderItems } });
      this.setState({ items: [] });
      localStorage.removeItem("cart");
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  renderAttributeOptions(item, attribute) {
    const kebabCase = (str) => str.toLowerCase().replace(/\s+/g, "-");
    const attributeNameKebab = kebabCase(attribute.id);

    return (
      <div
        key={attribute.id}
        data-testid={`cart-item-attribute-${attributeNameKebab}`}
      >
        <p className="text-sm mt-2">{attribute.name}:</p>
        <div className="flex mt-1">
          {attribute.items.map((option) => {
            const isSelected =
              item.selectedAttributes[attribute.id] === option.id;
            const optionNameKebab = kebabCase(option.value);
            return (
              <div
                key={option.id}
                className={`mr-1 border ${
                  isSelected ? "border-black" : "border-gray-300"
                }`}
                data-testid={`cart-item-attribute-${attributeNameKebab}-${optionNameKebab}${
                  isSelected ? "-selected" : ""
                }`}
              >
                {attribute.type === "swatch" ? (
                  <div
                    className="w-4 h-4"
                    style={{ backgroundColor: option.value }}
                  ></div>
                ) : (
                  <span className="text-xs m-2">{option.value}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const totalItems = this.state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const itemText = totalItems === 1 ? "1 Item" : `${totalItems} Items`;

    return (
      <div className="relative">
        <button onClick={this.toggleCart} data-testid="cart-btn">
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
        {this.state.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {this.state.items.length}
          </span>
        )}

        {this.state.isOpen && (
          <>
            <div
              className="fixed  top-16 inset-0 bg-black bg-opacity-30 z-40"
              onClick={this.toggleCart}
            ></div>
            <div className="absolute right-0 mt-2 bg-white p-4 shadow-lg w-80 z-50">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">
                  My Bag,{" "}
                  <span className="font-normal text-base">{itemText}</span>
                </h2>
              </div>

              {this.state.items.map((item) => (
                <div
                  key={`${item.id}-${JSON.stringify(item.selectedAttributes)}`}
                  className="mb-4 pb-4 border-b"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-normal">{item.name}</h3>
                      <p className="text-sm">
                        ${item.prices[0].amount.toFixed(2)}
                      </p>
                      {item.attributes.map((attribute) =>
                        this.renderAttributeOptions(item, attribute)
                      )}
                    </div>
                    <div className="flex flex-col justify-between items-center mt-2">
                      <button
                        className="border border-black w-6 h-6 flex items-center justify-center"
                        onClick={() => this.updateQuantity(item, 1)}
                        data-testid="cart-item-amount-increase"
                      >
                        +
                      </button>
                      <span className="mx-2" data-testid="cart-item-amount">
                        {item.quantity}
                      </span>
                      <button
                        className="border border-black w-6 h-6 flex items-center justify-center"
                        onClick={() => this.updateQuantity(item, -1)}
                        data-testid="cart-item-amount-decrease"
                      >
                        -
                      </button>
                    </div>
                    <img
                      src={item.gallery[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center font-semibold mb-4">
                <span>Total</span>
                <span data-testid="cart-total">${this.calculateTotal()}</span>
              </div>

              <button
                className={`w-full py-2 font-semibold ${
                  this.state.items.length > 0
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={this.placeOrder}
                disabled={this.state.items.length === 0}
              >
                PLACE ORDER
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default function CartWithMutation() {
  const [createOrder] = useMutation(CREATE_ORDER);
  return <Cart createOrder={createOrder} />;
}
