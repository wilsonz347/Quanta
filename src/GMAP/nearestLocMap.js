import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 31.5204, lng: 74.3587 }; // Default fallback: Lahore
const libraries = ["places"];

const GoogleMapWithPlaces = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [apiLoaded, setApiLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
        },
        (error) => {
          setError("Location access denied. Showing default location.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setApiLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (apiLoaded && userLocation) {
      fetchNearbyPlaces(userLocation);
    }
  }, [apiLoaded, userLocation]);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      adjustMapBounds();
    }
  }, [places]);

  const fetchNearbyPlaces = (location) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Places API is not loaded yet.");
      return;
    }

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location,
      radius: 600, // Search within 500m
      type: ["hospital", "clinic", "pharmacy", "doctor"],
    };

    const allResults = [];

    const processResults = (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const filteredResults = results.filter((place) =>
          place.types.some((type) => ["hospital", "clinic", "pharmacy", "doctor"].includes(type))
        );

        allResults.push(...filteredResults);

        if (pagination.hasNextPage) {
          pagination.nextPage();
        } else {
          setPlaces(allResults);
        }
      } else {
        console.error("Places API Error:", status);
      }
    };

    service.nearbySearch(request, processResults);
  };

  const adjustMapBounds = () => {
    if (!mapRef.current || !window.google || !userLocation) return;

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));

    places.forEach((place) => {
      bounds.extend(new window.google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()));
    });

    mapRef.current.fitBounds(bounds);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={userLocation || defaultCenter}
        zoom={19}
        onLoad={(map) => (mapRef.current = map)}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
            title="Your Location"
          />
        )}

        {places.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            title={place.name}
            icon={{
              url: "https://maps.google.com/mapfiles/kml/shapes/hospitals.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}
      </GoogleMap>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </LoadScript>
  );
};

export default GoogleMapWithPlaces;
