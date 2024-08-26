import React from "react";

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

  render() {
    return (
      <div className="relative">
        <button onClick={this.toggleCart}>
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
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {this.state.items.length}
        </span>

        {this.state.isOpen && (
          <div className="absolute right-0 mt-2 bg-white p-4 shadow-lg w-80 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">
                My Bag, {this.state.items.length} items
              </h2>
            </div>

            {this.state.items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="mb-4 pb-4 border-b"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm">
                      ${item.prices[0].amount.toFixed(2)}
                    </p>
                    <p className="text-sm mt-2">Size: {item.selectedSize}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm mr-2">Color:</span>
                      {this.renderColorOption(item.selectedColor)}
                    </div>
                  </div>
                  <img
                    src={item.gallery[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <button
                      className="border w-6 h-6 flex items-center justify-center"
                      onClick={() => this.updateQuantity(item, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="border w-6 h-6 flex items-center justify-center"
                      onClick={() => this.updateQuantity(item, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-gray-500"
                    onClick={() => this.removeItem(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center font-semibold mb-4">
              <span>Total</span>
              <span>${this.calculateTotal()}</span>
            </div>

            <button className="w-full bg-green-500 text-white py-2 font-semibold">
              PLACE ORDER
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
