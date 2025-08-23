"use client";
import React, { useState } from "react";
import { FaMaximize, FaMinimize } from "react-icons/fa6";

interface ControlProps {
  map: React.MutableRefObject<unknown>;
}

const FullscreenControl: React.FC<ControlProps> = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const mapContainer = document.getElementById("map-container");
    if (mapContainer) {
      if (!document.fullscreenElement) {
        mapContainer.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch((err) => console.error("Erreur lors de l'entrée en plein écran", err));
      } else {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch((err) => console.error("Erreur lors de la sortie du plein écran", err));
      }
    }
  };

  return (
    <div className="z-20">
      <button
        onClick={toggleFullscreen}
        className="bg-[#0F3342] text-white p-3 rounded shadow hover:scale-105 transition"
      >
        {isFullscreen ? <FaMinimize /> : <FaMaximize />}
      </button>
    </div>
  );
};

export default FullscreenControl;
