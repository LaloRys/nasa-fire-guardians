import React from "react";

const Main = () => {
  return (
    <div className="container mx-auto p-8 w-full h-full">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Bienvenido a nuestra aplicación MODIS
        </h2>
        <p>
          Living through a natural disaster is often complicated; fires can be
          caused by a variety of factors, from lightning strikes to human
          carelessness. Imagine having at your fingertips a website that
          collects historical data of fires that have occurred and can predict
          the areas near you or the people you love where there is a possibility
          of a fire developing. We invite you to explore Fire Data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Sobre los datos MODIS en esta aplicación
        </h2>
        <p>
          Los datos MODIS que se utilizan en esta aplicación son recopilados y
          proporcionados por la NASA. Se incluyen datos sobre incendios
          forestales, concentraciones de aerosoles y otros fenómenos relevantes.
          Estos datos son esenciales para monitorear y comprender la salud de
          nuestro planeta y su entorno.
        </p>
      </section>
    </div>
  );
};

export default Main;
