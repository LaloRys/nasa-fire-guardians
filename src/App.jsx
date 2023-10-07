import React from "react";
// import data from './data/modis_mexico.json'
import data from "./data/litte_modis_mexico.json";
import { Route, Routes } from "react-router-dom";
import MapMexico from "./pages/MapMexico";
import Navbar from "./pages/Navbar";
import CardData from "./pages/CardData";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Hello World</div>} />
        <Route path="/map" element={<MapMexico />} />
        <Route path="/card" element={<CardData />} />
      </Routes>
    </>
  );
}

export default App;
