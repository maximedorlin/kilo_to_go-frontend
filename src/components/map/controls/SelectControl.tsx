"use client";
import React, { useRef, useEffect } from "react";
import { AiOutlineSelect } from "react-icons/ai";
import Draw from "ol/interaction/Draw";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Map } from "ol";
import { Fill, Stroke, Style } from "ol/style";
import Polygon from "ol/geom/Polygon";
import GeoJSON from "ol/format/GeoJSON";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  setGeoSelectedIds,
  setMapIsLoading,
} from "@/store/slices/tables-pagiations-slices/geoSelectedIds.slice";
import { X } from "lucide-react";

interface SelectControlProps {
  map: Map | null;
  idPropertyName?: string;
  activeLayers?: Array<{
    name: string;
    setIdInstead?: boolean;
  }>;
  geoserverUrl?: string;
  workspace?: string;
  highlightSource: VectorSource<any>;
  onActiveChange?: (isActive: boolean) => void;
}

const SelectControl: React.FC<SelectControlProps> = ({
  map,
  activeLayers = [],
  geoserverUrl = "",
  highlightSource,
  onActiveChange,
}) => {
  const drawRef = useRef<Draw | null>(null);
  const drawLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const isActiveRef = useRef(false);
  const dispatch = useAppDispatch();
  const selelectedFeature = useAppSelector(
    (state) => state.geoSelectedIds.selelectedFeature
  );
  const geoSelectedIds = useAppSelector(
    (state) => state.geoSelectedIds.geoSelectedIds
  );
  const mapIsLoading = useAppSelector(
    (state) => state.geoSelectedIds.mapIsLoading
  );
  const cleanupDrawing = () => {
    if (!map) return;

    if (drawRef.current) {
      map.removeInteraction(drawRef.current);
      drawRef.current = null;
    }

    if (drawLayerRef.current) {
      map.removeLayer(drawLayerRef.current);
      drawLayerRef.current = null;
    }

    isActiveRef.current = false;
  };

  useEffect(() => {
    if (
      map &&
      selelectedFeature &&
      typeof selelectedFeature === "object" &&
      "features" in selelectedFeature &&
      geoSelectedIds.length === 0
    ) {
      const format = new GeoJSON();

      const features = format.readFeatures(selelectedFeature, {
        dataProjection: "EPSG:32632",
        featureProjection: map.getView().getProjection(),
      });

      highlightSource.clear();
      highlightSource.addFeatures(features);
      map.renderSync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightSource, map, selelectedFeature]);
  const startDrawing = () => {
    if (!map || !highlightSource || !activeLayers.length) return;

    const newActiveState = !isActiveRef.current;
    isActiveRef.current = newActiveState;

    if (onActiveChange) {
      onActiveChange(newActiveState);
    }

    cleanupDrawing();
    highlightSource.clear();

    isActiveRef.current = true;

    // Créer une nouvelle source et layer pour le dessin
    const drawSource = new VectorSource();
    const drawLayer = new VectorLayer({
      source: drawSource,
      style: new Style({
        fill: new Fill({ color: "rgba(255, 0, 0, 0.2)" }),
        stroke: new Stroke({ color: "#ff0000", width: 2 }),
      }),
      zIndex: 999,
    });

    drawLayerRef.current = drawLayer;
    map.addLayer(drawLayer);

    const draw = new Draw({
      source: drawSource,
      type: "Polygon",
    });

    drawRef.current = draw;
    map.addInteraction(draw);

    draw.on("drawend", async (event) => {
      const geometry = event.feature.getGeometry() as Polygon;
      if (!geometry || !highlightSource) return;

      dispatch(setMapIsLoading({ mapIsLoading: true }));
      try {
        const coords = geometry.getCoordinates()[0];
        const wktCoords = coords
          .map((coord) => `${coord[0]} ${coord[1]}`)
          .join(", ");
        const wktPolygon = `POLYGON((${wktCoords}))`;

        const url = `${geoserverUrl}ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${activeLayers[0].name}&outputFormat=application/json&CQL_FILTER=INTERSECTS(geom, ${wktPolygon})`;
        console.log("LOGGG            -------------------------", mapIsLoading);

        console.log("LOGGG            ++++++++++++++++++", mapIsLoading);
        const response = await fetch(url);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const format = new GeoJSON();
          const features = format.readFeatures(data, {
            dataProjection: "EPSG:32632",
            featureProjection: map.getView().getProjection(),
          });
          const ids = data.features.map((feature: { id: any }) => {
            const id = feature.id;
            return id.split(".")[1];
          });
          dispatch(setGeoSelectedIds({ geoSelectedIds: ids }));

          highlightSource.clear();
          highlightSource.addFeatures(features);
          map.renderSync();
        }
      } catch (error) {
        console.error("WFS Error:", error);
        dispatch(setMapIsLoading({ mapIsLoading: false }));
      }
      dispatch(setMapIsLoading({ mapIsLoading: false }));

      // Nettoyer après sélection
      cleanupDrawing();
    });
  };

  const stopDrawing = () => {
    dispatch(setGeoSelectedIds({ geoSelectedIds: [] }));
    cleanupDrawing();
    highlightSource.clear();
  };

  useEffect(() => {
    return () => {
      cleanupDrawing();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (
    selelectedFeature &&
    "features" in selelectedFeature &&
    selelectedFeature.features.length > 0
  )
    return;
  return (
    <div className="absolute top-[300px] z-20">
      {geoSelectedIds.length > 0 ? (
        <button
          onClick={stopDrawing}
          className={`bg-accent text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition ${
            isActiveRef.current ? "ring-2 ring-yellow-400" : ""
          }`}
          title="Sélection par polygone"
        >
          <X size={24} className="text-black" />
        </button>
      ) : (
        <button
          onClick={startDrawing}
          className={`bg-[#0F3342] text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition ${
            isActiveRef.current ? "ring-2 ring-yellow-400" : ""
          }`}
          title="Sélection par polygone"
        >
          <AiOutlineSelect size={24} />
        </button>
      )}
    </div>
  );
};

export default SelectControl;
