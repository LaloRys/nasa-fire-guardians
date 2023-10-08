import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";


const Main = () => {
  return (
    <div className="container mx-auto p-8">
      <FaMapMarkerAlt></FaMapMarkerAlt>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Bienvenido a nuestra aplicación MODIS</h2>
        <p>
          Esta aplicación utiliza datos del Moderate Resolution Imaging Spectroradiometer (MODIS), un instrumento
          de teledetección a bordo de los satélites Terra y Aqua de la NASA. MODIS proporciona datos valiosos
          para estudiar la Tierra, incluyendo información sobre la cobertura terrestre, temperaturas de superficie,
          concentraciones de aerosoles, incendios forestales y mucho más.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">Sobre los datos MODIS en esta aplicación</h2>
        <p>
          Los datos MODIS que se utilizan en esta aplicación son recopilados y proporcionados por la NASA.
          Se incluyen datos sobre incendios forestales, concentraciones de aerosoles y otros fenómenos relevantes.
          Estos datos son esenciales para monitorear y comprender la salud de nuestro planeta y su entorno.
        </p>
      </section>
    </div>
  );
};

export default Main;
