import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ProductList from "./components/ProductList";
// import ProductDetail from "./components/ProductDetail";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TermsAndConditions from './pages/policies/TermsAndConds';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import CookiePolicy from './pages/policies/CookiePolicy';
import Contact from './pages/ContactPage';

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/policies/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/policies/cookie-policy" element={<CookiePolicy />} />
            <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />            
            {/* <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} /> */}
            <Route path="/about" element={<h2>About Us</h2>} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
