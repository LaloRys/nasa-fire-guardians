import React, { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/litte_modis_mexico"; // Importa el archivo JSON
import { useParams } from "react-router-dom";

// Define un icono personalizado con un punto rojo
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [15, 25], // Cambia el tamaño del icono aquí [ancho, alto]
  iconAnchor: [7, 25], // Ajusta la posición del icono en relación al marcador [x, y]
  popupAnchor: [1, -20], // Ajusta la posición del popup en relación al icono [x, y]
  shadowSize: [25, 25],
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

function Map() {
  const { latitude: lat, longitude: long } = useParams();
  const mapRef = useRef(null);

  // Memoiza los datos para evitar recargas innecesarias
  const memoizedData = useMemo(() => data, []);

  console.log(lat, long)

  useEffect(() => {
    // Convierte las coordenadas de cadena a números
    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);

    let initialLatitude = 19.0224;
    let initialLongitude = -98.6248;

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
      L.marker([initialLatitude, initialLongitude], { icon: blueIcon }).addTo(map);

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

        const popupContent = `
          <div>
            <strong>Latitud:</strong> ${latitude} <br />
            <strong>Longitud:</strong> ${longitude} <br />
            <strong>Fecha de Adquisición:</strong> ${acq_date} <br />
            <strong>Brillo:</strong> ${brightness} <br />
            <strong>Confianza:</strong> ${confidence} <br />
            <strong>Bright_t31:</strong> ${bright_t31} <br />
            <strong>FRP:</strong> ${frp} <br />
            <strong>Tipo:</strong> ${type} <br />
          </div>
        `;

        const customPopup = L.popup().setContent(popupContent);

        L.marker([latitude, longitude], { icon: redIcon })
          .bindPopup(customPopup)
          .addTo(mapRef.current);
      });
    }
  }, [memoizedData]);

  return (
    <div id="map" style={{ height: "calc(100vh - 64px)", width: "100%" }}></div>
  );
}

export default Map;
