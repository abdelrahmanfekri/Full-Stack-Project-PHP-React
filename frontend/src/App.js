import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductDetail from "./pages/Product";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
