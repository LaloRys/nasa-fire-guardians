import React from "react";
// import data from './data/modis_mexico.json'
import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import Navbar from "./components/navbar/Navbar";
import CardData from "./pages/CardData";
import Main from "./pages/Main";
import Table from "./pages/Table";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/map" element={<Map/>} />
        <Route path="/card" element={<CardData />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </>
  );
}

export default App;
