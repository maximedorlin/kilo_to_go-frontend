"use client";
import React, { useEffect, useRef } from "react";
import { Map } from "ol";
import Geolocation from "ol/Geolocation";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Point, Circle as CircleGeom } from "ol/geom";
import Feature from "ol/Feature";
import {
  Style,
  Icon,
  Stroke,
  Fill,
  Circle as CircleStyle,
} from "ol/style";
import { LocateFixed } from "lucide-react";
import { IMAGES } from "@/constants/images";

interface GeolocateControlProps {
  map: Map | null;
}

const GeolocateControl: React.FC<GeolocateControlProps> = ({ map }) => {
  const geoLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const geolocationRef = useRef<Geolocation | null>(null);
  const isActiveRef = useRef(false);
  const firstLocateDone = useRef(false);

  const createGeolocationLayer = () => {
    const source = new VectorSource();

    const layer = new VectorLayer({
      source,
      style: (feature) => {
        const geometry = feature.getGeometry();
        const isAccuracyCircle = geometry instanceof CircleGeom;

        if (isAccuracyCircle) {
          return new Style({
            stroke: new Stroke({
              color: "rgba(30, 144, 255, 0.6)",
              width: 2,
            }),
            fill: new Fill({
              color: "rgba(30, 144, 255, 0.2)",
            }),
          });
        }

        const heading = feature.get("heading");

if (heading !== undefined && heading !== null) {
        return new Style({
          image: new Icon({
            src: IMAGES.arrow_locate,
            anchor: [0.5, 0.5], 
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            rotation: -heading, 
            rotateWithView: true,
            scale: 1,
            opacity: 1,
            color: '#1E90FF', 
          }),
        });
      }

        
        return new Style({
          image: new CircleStyle({
            radius: 8,
            fill: new Fill({ color: "#1E90FF" }),
            stroke: new Stroke({ color: "#fff", width: 2 }),
          }),
        });
      },
      zIndex: 999,
    });

    map?.addLayer(layer);
    geoLayerRef.current = layer;

    return source;
  };

  const startGeolocation = () => {
    if (!map || isActiveRef.current) return;

    const source = createGeolocationLayer();

    const geolocation = new Geolocation({
      tracking: true,
      projection: map.getView().getProjection(),
    });

    geolocationRef.current = geolocation;

    geolocation.on("change:position", () => {
      const coords = geolocation.getPosition();
      const heading = geolocation.getHeading();

      if (!coords) return;

      
      const positionFeature = new Feature(new Point(coords));
      positionFeature.set("heading", heading);

      const accuracyFeature = new Feature(
        new CircleGeom(coords, 15) 
      );

      source.clear();
      source.addFeatures([accuracyFeature, positionFeature]);

      if (!firstLocateDone.current) {
        map.getView().animate({
          center: coords,
          zoom: 18,
          duration: 800,
        });
        firstLocateDone.current = true;
      }
    });

    geolocation.on("error", (error) => {
      console.error("Erreur géolocalisation :", error.message);
      stopGeolocation();
      alert("Impossible de récupérer votre position.");
    });

    isActiveRef.current = true;
  };

  const stopGeolocation = () => {
    if (!map || !isActiveRef.current) return;

    geolocationRef.current?.setTracking(false);
    geolocationRef.current = null;

    if (geoLayerRef.current) {
      map.removeLayer(geoLayerRef.current);
      geoLayerRef.current = null;
    }

    firstLocateDone.current = false;
    isActiveRef.current = false;
  };

  useEffect(() => {
    return () => stopGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute top-[500px]  z-20">
      <button
        onClick={() =>
          isActiveRef.current ? stopGeolocation() : startGeolocation()
        }
        className={`bg-[#0F3342] text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition ${
          isActiveRef.current ? "ring-2 ring-yellow-400" : ""
        }`}
        title="Se géolocaliser"
      >
        <LocateFixed size={24} />
      </button>
    </div>
  );
};

export default GeolocateControl;
