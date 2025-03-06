import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import DeckBuilder from "./components/DeckBuilder"; // ✅ Import DeckBuilder

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/deck-builder" element={<DeckBuilder />} /> {/* ✅ Ensure this is included */}
      </Routes>
    </Router>
  );
}

export default App;