import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<h2>About Us</h2>} />
            <Route path="/contact" element={<h2>Contact Us</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
