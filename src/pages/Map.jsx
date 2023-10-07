import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../data/200_modis_mexico.json'; // Importa el archivo JSON

// Define un icono personalizado con un punto rojo
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [15, 25], // Cambia el tamaño del icono aquí [ancho, alto]
  iconAnchor: [7, 25], // Ajusta la posición del icono en relación al marcador [x, y]
  popupAnchor: [1, -20], // Ajusta la posición del popup en relación al icono [x, y]
  shadowSize: [25, 25],
});

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const latitude = 17.8385;  // Coordenadas iniciales
    const longitude = -93.1252;

    if (!mapRef.current) {
      // Crea un mapa y asigna una ubicación inicial
      const map = L.map('map').setView([latitude, longitude], 6);

      // Utiliza OpenStreetMap como fuente del mapa
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Crea un marcador y agrégalo al mapa
      L.marker([latitude, longitude]).addTo(map);

      mapRef.current = map;
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && data) {
      data.forEach(marker => {
        const { latitude, longitude } = marker;
        L.marker([latitude, longitude],{icon: redIcon}).addTo(mapRef.current);
      });
    }
  }, [data]);

  return (
    <div id="map" style={{ height: 'calc(100vh - 64px)', width: '100%' }}></div>
  );
}

export default Map;
