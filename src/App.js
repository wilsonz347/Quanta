import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Elements/Navbar";
import GoogleMapWithPlaces from "./GMAP/nearestLocMap";
import { UserLocationContext } from "./GMAP/userLocContext";
import "./index";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          alert("Location access denied. Please enable location services.");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <BrowserRouter>
        <Navbar />
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>Fetching your location...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nearby-clinics" element={<GoogleMapWithPlaces />} />
          </Routes>
        )}
      </BrowserRouter>
    </UserLocationContext.Provider>
  );
}

export default App;
