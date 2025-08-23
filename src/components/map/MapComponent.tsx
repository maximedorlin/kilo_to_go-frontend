"use client";

import React, { useRef, useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import BingMaps from "ol/source/BingMaps";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "../ui/loading-btn";
// import {
//   Quater,
//   ZoneChalandiseInterface,
// } from "@/interfaces/patrimoine/patrimoine.interfaces";

interface MapComponentProps {
  geoJSONDataChange?: (value: string) => void;
  onlyPolygon?: boolean;
  initial?: any;
}

const MapComponent: React.FC<MapComponentProps> = ({
  geoJSONDataChange,
  onlyPolygon,
  initial,
}) => {
  const mapRef = useRef<Map | null>(null);
  const [baseLayer, setBaseLayer] = useState<"OSM" | "BingMaps">("OSM");
  const [drawType, setDrawType] = useState<
    "Point" | "LineString" | "Polygon" | null
  >(null);
  const [geoJsonData, setGeoJsonData] = useState<string>(
    initial
      ? JSON.stringify({ type: "FeatureCollection", features: [initial] })
      : ""
  );
  const drawInteractionRef = useRef<Draw | null>(null);
  const vectorSourceRef = useRef(new VectorSource());

  const { t } = useTranslation();

  useEffect(() => {
    if (geoJSONDataChange) {
      geoJSONDataChange(geoJsonData);
    }
  }, [geoJsonData, geoJSONDataChange]);

  useEffect(() => {
    const osmLayer = new TileLayer({ source: new OSM() });
    const bingLayer = new TileLayer({
      source: new BingMaps({
        key: "AuOKP0N2ww907dY398Ci9ZKg38AqF2jc7q1QchUixWw30TpwdCt4T36ip-OyE49R",
        imagerySet: "AerialWithLabelsOnDemand",
      }),
    });
    const vectorLayer = new VectorLayer({ source: vectorSourceRef.current });

    const map = new Map({
      target: "map",
      layers: [baseLayer === "OSM" ? osmLayer : bingLayer, vectorLayer],
      view: new View({
        center: fromLonLat([11.5, 3.85]), // Coordonnées par défaut
        zoom: 12,
        minZoom: 12,
      }),
    });

    mapRef.current = map;

    return () => {
      map.setTarget("");
    };
  }, [baseLayer]);

  useEffect(() => {
    if (initial) {
      const format = new GeoJSON();
      const features = format.readFeatures(
        { type: "FeatureCollection", features: [initial] },
        {
          dataProjection: "EPSG:4326", // GeoJSON default
          featureProjection: "EPSG:4326", // OpenLayers default
        }
      );

      vectorSourceRef.current.clear(); // Clear existing features
      vectorSourceRef.current.addFeatures(features); // Add new feature(s)

      // Adjust the view to fit the feature(s)
      const extent = vectorSourceRef.current.getExtent();
      try {
        if (extent && mapRef.current) {
          mapRef.current.getView().fit(extent, { padding: [50, 50, 50, 50] });
        }
      } catch (error) {
        console.log(error);
        toast.error(t("map_data_not_loaded"));
      }
    }
  }, [initial, t]);

  // Ajout de l'interaction de dessin
  const addDrawInteraction = (type: "Point" | "LineString" | "Polygon") => {
    if (!mapRef.current) return;

    // Supprimer l'ancienne interaction si existante
    if (drawInteractionRef.current) {
      mapRef.current.removeInteraction(drawInteractionRef.current);
    }

    const draw = new Draw({
      source: vectorSourceRef.current,
      type: type,
    });

    setDrawType(type);

    draw.on("drawend", () => {
      console.log("Dessin terminé !");
    });

    drawInteractionRef.current = draw;
    mapRef.current.addInteraction(draw);
  };

  // Fonction pour supprimer les dessins
  const clearDrawing = () => {
    vectorSourceRef.current.clear();
    setGeoJsonData("");
    setDrawType(null);

    if (drawInteractionRef.current) {
      mapRef.current?.removeInteraction(drawInteractionRef.current);
      drawInteractionRef.current = null;
    }
  };

  // Fonction pour valider et récupérer le GeoJSON
  const validateDrawing = () => {
    if (!vectorSourceRef.current.getFeatures().length) {
      toast.error(t("no_drawn_geometry"));
      return;
    }

    const format = new GeoJSON();
    const geoJson = format.writeFeatures(vectorSourceRef.current.getFeatures());
    setGeoJsonData(geoJson);
  };

  return (
    <div className="w-full h-full">
      <div className="md:flex justify-between w-full">
        <div className="flex">
          {/* Sélecteur de fonds de carte */}
          <div className="bg-white p-2 rounded-md shadow-md z-10">
            <select
              className="border rounded-md p-1 text-xs md:text-sm"
              onChange={(event) =>
                setBaseLayer(event.target.value as "OSM" | "BingMaps")
              }
              value={baseLayer}
            >
              <option value="OSM">OpenStreetMap</option>
              <option value="BingMaps">Bing Maps</option>
            </select>
          </div>

          {/* Boutons pour l'édition de géométrie */}
          {geoJSONDataChange && (
            <div className="bg-white p-2 rounded-md shadow-md flex gap-x-2 text-xs md:text-sm">
              {!onlyPolygon && (
                <>
                  <LoadingButton
                    onClick={(e) => {
                      e.preventDefault();
                      addDrawInteraction("Point");
                    }}
                    size={"sm"}
                    variant={"outline"}
                  >
                    Point
                  </LoadingButton>
                  <LoadingButton
                    onClick={(e) => {
                      e.preventDefault();
                      addDrawInteraction("LineString");
                    }}
                    size={"sm"}
                    variant={"outline"}
                  >
                    {t("line")}
                  </LoadingButton>
                </>
              )}
              <LoadingButton
                onClick={(e) => {
                  e.preventDefault();
                  addDrawInteraction("Polygon");
                }}
                size={"sm"}
                variant={"outline"}
              >
                Polygon
              </LoadingButton>
            </div>
          )}
        </div>
        {/* Boutons pour valider et supprimer le dessin */}
        {drawType && (
          <div className="bg-white p-1 rounded-md shadow-md flex justify-end gap-x-2">
            <LoadingButton
              onClick={(e) => {
                e.preventDefault();
                validateDrawing();
              }}
              size={"sm"}
            >
              {t("validate")}
            </LoadingButton>
            <LoadingButton
              onClick={(e) => {
                e.preventDefault();
                clearDrawing();
              }}
              size={"sm"}
              variant={"secondary"}
            >
              {t("clear")}
            </LoadingButton>
          </div>
        )}
      </div>

      {/* Carte */}
      <div id="map" className="w-full h-full"></div>
    </div>
  );
};

export default MapComponent;
