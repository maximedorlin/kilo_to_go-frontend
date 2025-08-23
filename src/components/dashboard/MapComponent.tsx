"use client";
import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
import { XYZ } from "ol/source";

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // const map = new Map({
    //   target: mapRef.current,
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //   ],
    //   view: new View({
    //     center: [11.5123, 3.848],
    //     zoom: 6,
    //   }),
    // });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [3.5123, 7.848], // Longitude, Latitude of Yaoundé, Cameroon
        zoom: 4,
      }),
    });
    return () => map.setTarget(undefined);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
