import React from "react";
// import data from './data/modis_mexico.json'
import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import Navbar from "./pages/Navbar";
import CardData from "./pages/CardData";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Hello World</div>} />
        <Route path="/map" element={<Map/>} />
        <Route path="/card" element={<CardData />} />
      </Routes>
    </>
  );
}

export default App;
