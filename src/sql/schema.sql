-- Active: 1696539837301@@127.0.0.1@5432@firebase

CREATE TABLE
    modis_2022_mexico (
        latitude DECIMAL(10, 7),
        longitude DECIMAL(10, 7),
        brightness DECIMAL(10, 2),
        scan DECIMAL(4, 2),
        track DECIMAL(4, 2),
        acq_date DATE,
        acq_time INTEGER,
        satellite VARCHAR(20),
        instrument VARCHAR(20),
        confidence INTEGER,
        version DECIMAL(5, 2),
        bright_t31 DECIMAL(5, 2),
        frp DECIMAL(5, 2),
        daynight CHAR(1),
        type INTEGER
    );

CREATE TABLE
    modis_2022_mexico (
        latitude FLOAT,
        longitude FLOAT,
        brightness FLOAT,
        scan FLOAT,
        track FLOAT,
        acq_date DATE,
        acq_time INT,
        satellite VARCHAR(50),
        instrument VARCHAR(50),
        confidence INT,
        version FLOAT,
        bright_t31 FLOAT,
        frp FLOAT,
        daynight VARCHAR(1),
        type INT
    );

SELECT * FROM modis_2022_mexico;

COPY modis_2022_Mexico
FROM
    'C:/modis_2022_Mexico.csv' DELIMITER ',' CSV HEADER;