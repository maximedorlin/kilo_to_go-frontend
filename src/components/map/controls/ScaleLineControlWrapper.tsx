"use client";
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import ScaleLine from "ol/control/ScaleLine";
import "ol/ol.css"; 

interface ScaleLineControlWrapperProps {
  map: React.RefObject<Map | null>;
  targetId: string; 
}

const ScaleLineControlWrapper: React.FC<ScaleLineControlWrapperProps> = ({ map, targetId }) => {
  const scaleLineControlRef = useRef<ScaleLine | null>(null);

  useEffect(() => {
    if (!map.current || !document.getElementById(targetId)) return;

    const control = new ScaleLine({
      target: document.getElementById(targetId) as HTMLElement,
      units: "metric",
      bar: true,
      steps: 4,
      text: true,
      minWidth: 100,
    });

    scaleLineControlRef.current = control;
    map.current.addControl(control);

    return () => {
      if (map.current && scaleLineControlRef.current) {
        map.current.removeControl(scaleLineControlRef.current);
      }
      scaleLineControlRef.current = null;
    };
  }, [map, targetId]);

  return null; 
};

export default ScaleLineControlWrapper;