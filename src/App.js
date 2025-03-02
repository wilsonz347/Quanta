import "./index";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Home from "./Pages/Home";
import Navbar from "./Elements/Navbar";
import React from "react";
import NearestClinicsMap from "./GMAP/nearestLocMap";

function App() {
  return (  
    <BrowserRouter> 
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nearby-clinics" element={<NearestClinicsMap />} /> 
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
