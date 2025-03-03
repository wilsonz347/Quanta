import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { UserLocationContext } from "./userLocContext";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const GoogleMapView = () => {
  const { userLocation } = useContext(UserLocationContext);
  const [map, setMap] = useState(null);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    if (!key) {
      console.error("Google Maps API key is missing. Make sure it's set in .env");
    }
    setApiKey(key);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const onLoadMap = (mapInstance) => {
    setMap(mapInstance);
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || { lat: 40.7128, lng: -74.0060 }} // Default to New York
      zoom={15}
      onLoad={onLoadMap}
    >
      {userLocation && <Marker position={userLocation} />}
    </GoogleMap>
  );
};

export default GoogleMapView;
