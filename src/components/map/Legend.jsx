import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FireBs } from "../UI/icons";

const legendData = {
  blue: {
    color: "#3e5bff",
    label: "Fire Danger Level: Low (300.6 - 315.64)",
    info: "When the fire danger is 'low' it means that fuels do not ignite easily from small embers, but a more intense heat source, such as lightning, may start fires in duff or dry rotten wood. Fires in open, dry grasslands may burn easily a few hours after a rain, but most wood fires will spread slowly, creeping or smoldering. Control of fires is generally easy.",
  },
  green: {
    color: "#6cac60",
    label: "Fire Danger Level: Moderate (315.64 - 330.68) ",
    info: `When the fire danger is "moderate" it means that fires can start from most accidental
    causes, but the number of fire starts is usually pretty low. If a fire does start in an
    open, dry grassland, it will burn and spread quickly on windy days. Most wood fires
    will spread slowly to moderately. Average fire intensity will be moderate except in
    heavy concentrations of fuel, which may burn hot. Fires are still not likely to become
    serious and are often easy to control.
    `,
  },
  yellow: {
    color: "#ffde68",
    label: "Fire Danger Level: Moderate (315.64 - 330.68) ",
    info: `When the fire danger is "high", fires can start easily from most causes and small
    fuels (such as grasses and needles) will ignite readily. Unattended campfires and
    brush fires are likely to escape. Fires will spread easily, with some areas of
    high-intensity burning on slopes or concentrated fuels. Fires can become serious
    and difficult to control unless they are put out while they are still small.`,
  },
  orange: {
    color: "#ff991b",
    label: "Fire Danger Level: Moderate (315.64 - 330.68) ",
    info: `When the fire danger is "very high", fires will start easily from most causes. The fires
    will spread rapidly and have a quick increase in intensity, right after ignition. Small
    fires can quickly become large fires and exhibit extreme fire intensity, such as
    long-distance spotting and fire whirls. These fires can be difficult to control and will
    often become much larger and longer-lasting fires.
    `,
  },
  red: {
    color: "#ff3c1a",
    label: "Fire Danger Level: Moderate (315.64 - 330.68) ",
    info: `When the fire danger is "extreme", fires of all types start quickly and burn intensely.
    All fires are potentially serious and can spread very quickly with intense burning.
    Small fires become big fires much faster than at the "very high" level. Spot fires are
    probable, with long-distance spotting likely. These fires are very difficult to fight and
    may become very dangerous and often last for several days.
    `,
  },
  // Define data for other markers similarly
};

const Legend = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLegendVisible, setIsLegendVisible] = useState(true);

  const handleToggleLegend = () => {
    setIsLegendVisible((prev) => !prev);
    setSelectedMarker(null); // Clear selected marker when hiding
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker === selectedMarker ? null : marker);
  };

  const handleHideInfo = () => {
    setSelectedMarker(null);
  };

  return (
    <div
      id="legend"
      className={`mt-10 text-black rounded-lg shadow-xl opacity-85 ${
        isLegendVisible ? "visible" : "hidden"
      }`}
      style={{
        position: "absolute",
        right: "20px",
        backgroundColor: "white",
        padding: "10px",
        zIndex: 1000,
        maxHeight: "80vh",  // Establece la altura máxima al 80% de la altura de la ventana
        overflowY: "auto",
        
      }}
    >
      <div className="flex justify-between mb-2">
        <h3 className="uppercase font-bold text-lg text-center">Symbology</h3>
        <div className="cursor-pointer" onClick={handleToggleLegend}>
          {isLegendVisible ? (
            <FaTimes style={{ fontSize: "24px", color: "#000" }} />
          ) : (
            <FaBars style={{ fontSize: "24px", color: "#000" }} />
          )}
        </div>
      </div>
      <div>
        {Object.keys(legendData).map((markerKey) => (
          <div
            key={markerKey}
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => handleMarkerClick(markerKey)}
            style={{maxWidth: "500px"}}
          >
            <i className={`mr-2`}>
              <FireBs style={{ color: legendData[markerKey].color }} />
            </i>
            <div>{legendData[markerKey].label}</div>
            {selectedMarker === markerKey && (
              <div className="ml-8 mt-2">
                <p>{legendData[markerKey].info}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedMarker && (
        <div className="mt-2">
          <button className="bg-[#1b3c5b] text-white py-1 px-2 rounded-md hover:bg-[#335779] hover:text-white" onClick={handleHideInfo}>
            Hide information
          </button>
        </div>
      )}
    </div>
  );
};

export default Legend;
