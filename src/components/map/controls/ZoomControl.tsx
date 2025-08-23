"use client";
import React from "react";
import { Map } from "ol";
import { FaHouse, FaPlus, FaMinus } from "react-icons/fa6";

interface ControlProps {
  map: React.MutableRefObject<Map | null>;
}

const ZoomControl: React.FC<ControlProps> = ({ map }) => {
  const zoomIn = () => {
    const view = map.current?.getView();
    if (view) {
      view.animate({ zoom: (view.getZoom() || 0) + 1, duration: 250 });
    }
  };

  const zoomOut = () => {
    const view = map.current?.getView();
    if (view) {
      view.animate({ zoom: (view.getZoom() || 0) - 1, duration: 250 });
    }
  };

  const resetZoom = () => {
    const view = map.current?.getView();
    if (view) {
      
      view.animate({
        zoom: 12, 
        center: [579662.687, 443024.4034],
        duration: 300, 
      });
    }
  };

  return (
    <div className="flex flex-col  gap-2 z-20">
      <button
        onClick={zoomIn}
        className="bg-[#0F3342] text-white p-3 rounded shadow hover:scale-105 transition"
      >
        <FaPlus />
      </button>
      <button
        onClick={resetZoom}
        className="bg-[#0F3342] text-white p-3 rounded shadow hover:scale-105 transition"
      >
        <FaHouse />
      </button>
      <button
        onClick={zoomOut}
        className="bg-[#0F3342] text-white p-3 rounded shadow hover:scale-105 transition"
      >
        <FaMinus />
      </button>
    </div>
  );
  
};

export default ZoomControl;
