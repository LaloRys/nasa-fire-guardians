import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dataMexico from "../data/litte_modis_mexico"; // Importa el archivo JSON
// import dataMexico from "../data/200_modis_mexico"; // Importa el archivo JSON
// import dataUK from '../data/modis_2022_United_Kingdom.json'
import dataUK from "../data/modis_2022_United_Kingdom-200.json";

import { useParams } from "react-router-dom";
import fireBlue from "../assets/fireBlue.png";
import fireGreen from "../assets/fireGreen.png";
import fireOrange from "../assets/fireOrange.png";
import fireRed from "../assets/fireRed.png";
import fireYellow from "../assets/fireYellow.png";
import Legend from "../components/map/Legend";

// Define un icono personalizado con un punto rojo
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [30, 50], // Cambia el tamaño del icono aquí [ancho, alto]
  iconAnchor: [14, 50], // Ajusta la posición del icono en relación al marcador [x, y]
  popupAnchor: [1, -20], // Ajusta la posición del popup en relación al icono [x, y]
  shadowSize: [15, 15],
});

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [30, 50], // Cambia el tamaño del icono aquí [ancho, alto]
  iconAnchor: [14, 50], // Ajusta la posición del icono en relación al marcador [x, y]
  popupAnchor: [1, -20], // Ajusta la posición del popup en relación al icono [x, y]
  shadowSize: [25, 25],
});

function createFireIcon(iconUrl) {
  return new L.Icon({
    iconUrl: iconUrl,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [15, 20], // Cambia el tamaño del icono aquí [ancho, alto]
    iconAnchor: [7, 25], // Ajusta la posición del icono en relación al marcador [x, y]
    popupAnchor: [1, -20], // Ajusta la posición del popup en relación al icono [x, y]
    shadowSize: [12, 12],
  });
}

const fireBlueIcon = createFireIcon(fireBlue);
const fireGreenIcon = createFireIcon(fireGreen);
const fireYellowIcon = createFireIcon(fireYellow);
const fireOrangeIcon = createFireIcon(fireOrange);
const fireRedIcon = createFireIcon(fireRed);

function Map() {
  const { latitude: lat, longitude: long } = useParams();
  const mapRef = useRef(null);
  const [selectedData, setSelectedData] = useState(dataUK);

  // Memoiza los datos para evitar recargas innecesarias
  const memoizedData = useMemo(() => selectedData, [selectedData]);

  useEffect(() => {
    // Convierte las coordenadas de cadena a números
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

    let initialLatitude = 51.5074;
    let initialLongitude = -0.1278;

    // let initialLatitude = 19.4326;
    // let initialLongitude = -99.1332;

    // Si latitude o longitude son válidos, se utilizan como coordenadas iniciales
    if (!isNaN(latitude) && !isNaN(longitude)) {
      initialLatitude = latitude;
      initialLongitude = longitude;
    }

    if (!mapRef.current) {
      // Crea un mapa y asigna una ubicación inicial
      const map = L.map("map").setView([initialLatitude, initialLongitude], 6);

      // Utiliza OpenStreetMap como fuente del mapa

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      
      // Crea un marcador y agrégalo al mapa
      L.marker([initialLatitude, initialLongitude], { icon: redIcon }).addTo(
        map
      );

      mapRef.current = map;
    }
  }, [lat, long]);

  useEffect(() => {
    if (mapRef.current && memoizedData) {
      memoizedData.forEach((marker) => {
        const {
          latitude,
          longitude,
          acq_date,
          brightness,
          confidence,
          bright_t31,
          frp,
          type,
        } = marker;

        // Define el icono en función del brillo (brightness)
        let selectedIcon;
        if (brightness < 315.64) {
          selectedIcon = fireBlueIcon;
        } else if (brightness < 330.68) {
          selectedIcon = fireGreenIcon;
        } else if (brightness < 345.72) {
          selectedIcon = fireYellowIcon;
        } else if (brightness < 360.76) {
          selectedIcon = fireOrangeIcon;
        } else {
          selectedIcon = fireRedIcon;
        }

        const popupContent = `
          <div>
            <strong>Latitude:</strong> ${latitude} <br />
            <strong>Length:</strong> ${longitude} <br />
            <strong>Acquisition Date:</strong> ${acq_date} <br />
            <strong>Brightness:</strong> ${brightness} <br />
            <strong>Trust:</strong> ${confidence} <br />
            <strong>Bright_t31:</strong> ${bright_t31} <br />
            <strong>FRP:</strong> ${frp} <br />
            <strong>Type:</strong> ${type} <br />
          </div>
        `;

        const customPopup = L.popup().setContent(popupContent);

        L.marker([latitude, longitude], { icon: selectedIcon })
          .bindPopup(customPopup)
          .addTo(mapRef.current);
      });
    }
  }, [memoizedData]);

  useEffect(() => {
    if (mapRef.current) {
      let latitude, longitude;

      if (selectedData === dataMexico) {
        latitude = 23.6345;  // Coordenadas aproximadas para el centro de México
        longitude = -102.5528;
      } else if (selectedData === dataUK) {
        latitude = 54.7024;  // Coordenadas aproximadas para el centro del Reino Unido
        longitude = -3.2766;
      }

      mapRef.current.setView([latitude, longitude], 6);
    }
  }, [selectedData]);

  return (
    <div style={{ position: "relative", height: "calc(100vh - 64px)" }}>
      <div>
        <select
          className="absolute left-4 bottom-8 sm:bottom-4 px-3 py-2 bg-[#1b3c5b] border border-gray-300 rounded"
          style={{
            zIndex: 1000,
          }}
          value={selectedData === dataMexico ? "mexico" : "uk"}
          onChange={(e) => {
            setSelectedData(e.target.value === "mexico" ? dataMexico : dataUK);
          }}
        >
          <option value="mexico">Mexico Data</option>
          <option value="uk">United Kingdom Data</option>
        </select>
      </div>

    
      <Legend />

      <div id="map" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
}

export default Map;
