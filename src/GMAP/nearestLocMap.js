import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const GOOGLE_API_KEY = "AIzaSyBvLym8BP5nhtvGGMHPrxU8A0ECfFVepQg";
const BASE_URL = "https://maps.googleapis.com/maps/api/place";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function NearestClinicsMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [userLocation, setUserLocation] = useState(null);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyClinics(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const fetchNearbyClinics = async (lat, lng) => {
    try {
      const response = await fetch(
        `${BASE_URL}/textsearch/json?query=clinic&location=${lat},${lng}&radius=100&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      
      if (data.status === "OK") {
        setClinics(data.results);
      } else {
        console.error("Error fetching clinics:", data.status);
      }
    } catch (error) {
      console.error("API fetch error:", error);
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="text-center">Find Nearest Clinics</h3>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || { lat: 0, lng: 0 }}
        zoom={15}
        options={options}
      >
        {/* User Location */}
        {userLocation && <Marker position={userLocation} label="You" />}

        {/* Nearby Clinics */}
        {clinics.map((clinic, index) => (
          <Marker key={index} position={clinic.geometry.location} label="🏥" />
        ))}
      </GoogleMap>
    </div>
  );
}

export default NearestClinicsMap;
