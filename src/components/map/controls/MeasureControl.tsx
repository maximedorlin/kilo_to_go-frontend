"use client";
import React, { useRef, useState } from "react";
import { Map } from "ol";
import { FaTrashCan, FaRuler } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Stroke, Fill, Circle as CircleStyle, Text } from "ol/style";
import { getArea, getLength } from "ol/sphere";
import { unByKey } from "ol/Observable";
import { LineString, Polygon } from "ol/geom";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { EventsKey } from "ol/events";

interface ControlProps {
  map: React.MutableRefObject<Map | null>;
}

const MeasureControl: React.FC<ControlProps> = ({ map }) => {
  const [showOptions, setShowOptions] = useState(false);
  const drawRef = useRef<Draw | null>(null);
  const listenerRef = useRef<EventsKey | null>(null);
  const sketchFeatureRef = useRef<Feature | null>(null);
  const measureLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const measureLayersRef = useRef<VectorLayer<VectorSource>[]>([]);


  const createMeasureLayer = () => {
    const source = new VectorSource();

    const layer = new VectorLayer({
      source,
      style: (feature) => {
        const geom = feature.getGeometry();
        let label = "";
        let labelCoord: number[] | undefined;

        if (geom instanceof Polygon) {
          const area = getArea(geom);
          label = area > 10000 ? `${(area / 10000).toFixed(2)} ha` : `${area.toFixed(2)} m²`;
          labelCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof LineString) {
          const length = getLength(geom);
          label = length > 1000 ? `${(length / 1000).toFixed(2)} km` : `${length.toFixed(2)} m`;
          const coords = geom.getCoordinates();
          const mid = Math.floor(coords.length / 2);
          if (coords.length >= 2) {
            const coord1 = coords[mid - 1];
            const coord2 = coords[mid];
            labelCoord = [
              (coord1[0] + coord2[0]) / 2,
              (coord1[1] + coord2[1]) / 2,
            ];
          }
        }

        const styles = [
          new Style({
            stroke: new Stroke({ color: "#FF5733", width: 3 }),
            fill: new Fill({ color: "rgba(255, 87, 51, 0.1)" }),
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: "#FF5733" }),
              stroke: new Stroke({ color: "#fff", width: 2 }),
            }),
          }),
        ];

        if (label && labelCoord) {
          styles.push(
            new Style({
              geometry: new Point(labelCoord),
              text: new Text({
                text: label,
                font: "14px Calibri,sans-serif",
                fill: new Fill({ color: "#000" }),
                stroke: new Stroke({ color: "#fff", width: 3 }),
                offsetY: -15,
                textAlign: "center",
                overflow: true,
                textBaseline: "middle",
              }),
            })
          );
        }

        return styles;
      },
    });

    return { layer, source };
  };

  const startMeasure = (type: "LineString" | "Polygon") => {
    if (!map.current) return;

    if (drawRef.current) {
      map.current.removeInteraction(drawRef.current);
    }

    const { layer, source } = createMeasureLayer();
    measureLayerRef.current = layer;

    const draw = new Draw({
      source,
      type,
    });

    drawRef.current = draw;
    map.current.addInteraction(draw);

    if (listenerRef.current) {
      unByKey(listenerRef.current);
    }

    draw.on("drawstart", (event) => {
      sketchFeatureRef.current = event.feature;

      const geom = event.feature.getGeometry();
      if (geom) {
        listenerRef.current = geom.on("change", () => {
          sketchFeatureRef.current?.changed();
          map.current?.render();
        });
      }
    });

    draw.on("drawend", () => {
      if (listenerRef.current) {
        unByKey(listenerRef.current);
        listenerRef.current = null;
      }
      sketchFeatureRef.current = null;

      map.current?.removeInteraction(draw);
      drawRef.current = null;

      if (measureLayerRef.current) {
        map.current?.addLayer(measureLayerRef.current);
        measureLayersRef.current.push(measureLayerRef.current);
      }
    });
  };

  const clearMeasurements = () => {
    if (!map.current) return;
  
    measureLayersRef.current.forEach((layer) => {
      map.current?.removeLayer(layer);
    });
    measureLayersRef.current = [];
  
    if (drawRef.current) {
      map.current.removeInteraction(drawRef.current);
      drawRef.current = null;
    }
  };
  

return (
  <div className="absolute top-[250px]  z-50">
    
    <button
      onClick={() => setShowOptions((prev) => !prev)}
      className="bg-[#0F3342] text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition"
    >
      <FaRuler size={24} />
    </button>

    
    {showOptions && (
      <div className="absolute right-12 top-0 flex flex-row-reverse gap-2">
        <button
          onClick={() => startMeasure("LineString")}
          className="bg-[#0F3342] text-white p-2 rounded hover:scale-105 active:scale-100 transition"
        >
          <GiPathDistance size={24} />
        </button>
        <button
          onClick={() => startMeasure("Polygon")}
          className="bg-[#0F3342] text-white p-2 rounded hover:scale-105 active:scale-100 transition"
        >
          <LiaDrawPolygonSolid size={24} />
        </button>
        <button
          onClick={clearMeasurements}
          className="bg-[#ED6B24] text-white p-2 rounded hover:scale-105 active:scale-100 transition"
        >
          <FaTrashCan size={24} />
        </button>
      </div>
    )}
  </div>
);

};

export default MeasureControl;
