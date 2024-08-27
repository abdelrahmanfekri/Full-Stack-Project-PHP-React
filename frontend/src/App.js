import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/Product";
import { CartProviderWrapper } from "./context/CartContext";

class App extends React.Component {
  render() {
    return (
      <CartProviderWrapper>
        <Router>
          <Header />
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </CartProviderWrapper>
    );
  }
}

export default App;
