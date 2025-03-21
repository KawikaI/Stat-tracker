import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import DeckBuilder from "./components/DeckBuilder"; // deckbuilder import
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/deck-builder" element={<DeckBuilder />} /> {/*include*/}
      </Routes>
    </Router>
  );
}

export default App;