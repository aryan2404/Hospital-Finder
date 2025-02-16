import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import redIconUrl from "../assests/red-marker.png";
import blueIconUrl from "../assests/blue-marker.png";
import styles from "../styles/Map.module.css"; 

const createIcon = (iconUrl) =>
  new L.Icon({
    iconUrl,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
  });

const MapComponent = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 13);
    }
  }, [userLocation, map]);

  return null;
};

const Map = () => {
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        const query = `
          [out:json];
          node["amenity"="hospital"](around:5000, ${latitude}, ${longitude});
          out;
        `;
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        fetch(overpassUrl)
          .then((res) => res.json())
          .then((data) => {
            const hospitalData = data.elements.map((el) => ({
              id: el.id,
              lat: el.lat,
              lng: el.lon,
              name: el.tags.name || "Unknown Hospital",
            }));
            setHospitals(hospitalData);
          })
          .catch((error) => console.error("Error fetching hospitals:", error));
      },
      () => alert("Unable to retrieve your location.")
    );
  }, []);

  if (!userLocation) return <p className={styles.loadingText}>Loading Map...</p>;

  return (
    <div className={styles.mapWrapper}>
      <MapContainer center={userLocation} zoom={13} className={styles.mapContainer}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapComponent userLocation={userLocation} />

        <Marker position={userLocation} icon={createIcon(redIconUrl)}>
          <Popup>You are here</Popup>
        </Marker>

        <MarkerClusterGroup>
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={[hospital.lat, hospital.lng]}
              icon={createIcon(blueIconUrl)}
            >
              <Popup>{hospital.name}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
