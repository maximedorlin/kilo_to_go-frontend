"use client";
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import OverviewMap from "ol/control/OverviewMap";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM"; 
import "ol/ol.css";

interface OverviewMapControlWrapperProps {
  map: React.RefObject<Map | null>;
  targetId?: string;
  initialCollapsed?: boolean;
}

const OverviewMapControlWrapper: React.FC<OverviewMapControlWrapperProps> = ({
  map,
  targetId,
  initialCollapsed = false,
}) => {
  const overviewMapControlRef = useRef<OverviewMap | null>(null);

  useEffect(() => {
    if (!map.current) return;

    let targetElement: HTMLElement | undefined = undefined;
    if (targetId) {
      targetElement = document.getElementById(targetId) || undefined;
      if (!targetElement) {
        console.warn(`OverviewMap target element with ID "${targetId}" not found.`);
      }
    }

    const control = new OverviewMap({
      className: "ol-overviewmap ol-custom-overviewmap",
      layers: [
        new TileLayer({
          source: new OSM(), 
        }),
      ],
      collapsed: initialCollapsed,
      collapsible: true,
      target: targetElement,
    });

    overviewMapControlRef.current = control;
    map.current.addControl(control);

    return () => {
      if (map.current && overviewMapControlRef.current) {
        if (overviewMapControlRef.current.getMap()) {
          overviewMapControlRef.current.setMap(null);
        }
      }
      overviewMapControlRef.current = null;
    };
  }, [map, targetId, initialCollapsed]);

  return null;
};

export default OverviewMapControlWrapper;
