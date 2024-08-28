import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../apollo/mutations";

export const CartContext = React.createContext();

export class CartProvider extends React.Component {
  state = {
    items: [],
    isOpen: false,
  };

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

  updateQuantity = (item, change) => {
    const updatedItems = this.state.items
      .map((i) =>
        i.id === item.id &&
        JSON.stringify(i.selectedAttributes) ===
          JSON.stringify(item.selectedAttributes)
          ? { ...i, quantity: Math.max(0, i.quantity + change) }
          : i
      )
      .filter((i) => i.quantity > 0);

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

  calculateTotal = () => {
    return this.state.items
      .reduce((total, item) => total + item.prices[0].amount * item.quantity, 0)
      .toFixed(2);
  };

  addToCart = (product, selectedAttributes) => {
    const existingItem = this.state.items.find(
      (i) =>
        i.id === product.id &&
        JSON.stringify(i.selectedAttributes) ===
          JSON.stringify(selectedAttributes)
    );
    if (existingItem) {
      existingItem.quantity += 1;
      this.setState({ items: [...this.state.items] }, () => {
        localStorage.setItem("cart", JSON.stringify(this.state.items));
        this.toggleCart();
      });
    } else {
      const item = { ...product };
      item.quantity = 1;
      item.selectedAttributes = selectedAttributes;
      this.setState({ items: [...this.state.items, item] }, () => {
        localStorage.setItem("cart", JSON.stringify(this.state.items));
        this.toggleCart();
      });
    }
  };

  openCart = () => {
    if (!this.state.isOpen) {
      this.toggleCart();
    }
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          toggleCart: this.toggleCart,
          updateQuantity: this.updateQuantity,
          placeOrder: this.placeOrder,
          calculateTotal: this.calculateTotal,
          addToCart: this.addToCart,
          openCart: this.openCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export function withCartContext(WrappedComponent) {
  return class extends React.Component {
    static contextType = CartContext;

    render() {
      return <WrappedComponent {...this.props} cartContext={this.context} />;
    }
  };
}

export function CartProviderWrapper({ children }) {
  const [createOrder] = useMutation(CREATE_ORDER);
  return <CartProvider createOrder={createOrder}>{children}</CartProvider>;
}
