import React, { useMemo } from "react";
// import data from './data/modis_mexico.json'
import data from "../data/litte_modis_mexico.json";

function CardData() {
  const memoizedData = useMemo(() => data, []);

  console.log(memoizedData);

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-5 gap-3">
      {memoizedData.map((item, index) => (
        <div
          key={index}
          className="p-4 mt-4 border-2 border-black text-black bg-[#ecf6fa] bg-opacity-70 backdrop-blur rounded-lg"
        >
          <h1 className="text-xl bg-[#224c73] text-center text-white p-2 rounded-t-lg">
            Dato: {index}
          </h1>
          <p className="py-2">Latitude: {item.latitude}</p>
          <p className="py-2">Length: {item.longitude}</p>
          <p className="py-2">Confidence: {item.confidence}</p>
          <p className="py-2 font-bold">Bright_T31: {item.bright_t31}</p>
          <p className="py-2 font-bold">FRP: {item.frp}</p>
          <span className="bg-indigo-500 px-4 py-2 rounded-lg text-white">
            #{item.acq_date}
          </span>
          <div className="flex items-center py-2">
            {item.daynight === "N" ? (
              <span className="bg-black text-white px-4 py-2 rounded-lg">
                ⚫
              </span>
            ) : (
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
                🟡
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardData;
