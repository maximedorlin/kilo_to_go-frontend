"use client";
import React from "react";
import { Map } from "ol";
import { FaPrint } from "react-icons/fa6";

interface ControlProps {
  map: React.MutableRefObject<Map | null>;
}

const PrintControl: React.FC<ControlProps> = ({ map }) => {
  const printMap = () => {
    const mapCanvas = map.current?.getViewport().querySelector("canvas");
    if (mapCanvas) {
      const dataUrl = mapCanvas.toDataURL();
      const newTab = window.open();
      newTab?.document.write(`<img src='${dataUrl}' />`);
    }
  };

  return (
    <div className="absolute top-96  z-20">
      <button
        onClick={printMap}
        className="bg-[#0F3342] text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition"
      >
        <FaPrint size={24} />
      </button>
    </div>
  );
};

export default PrintControl;
