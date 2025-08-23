"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import { TileWMS } from "ol/source";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";
import Select from "ol/interaction/Select";
import { click } from "ol/events/condition";
import ZoomControl from "./controls/ZoomControl";
import FullscreenControl from "./controls/FullscreenControl";
import MeasureControl from "./controls/MeasureControl";
import PrintControl from "./controls/PrintControl";
import LegendControl from "./controls/LegendControl";
import LayerManager from "./controls/LayerManager";
import BaseMapControl from "./controls/BaseMapControl";
import SelectControl from "./controls/SelectControl";
import ScaleLineControlWrapper from "./controls/ScaleLineControlWrapper";
import OverviewMapControlWrapper from "./controls/OverviewMapControlWrapper";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { useWfsFeatureHighlighter } from "@/hooks/useWfsFeatureHighlighter";
import { clearGeoJSON, setGeoJSON } from "@/store/slices/form-map/mapSlice";
import GeolocateControl from "./controls/GeolocateControl";
import TileLayer from "ol/layer/Tile";
import { usePathname } from "next/navigation";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { LoadingButton } from "../ui/loading-btn";
import { LoaderCircle } from "lucide-react";

proj4.defs(
  "EPSG:32632",
  "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"
);

register(proj4);

interface MapContainerProps {
  layerUrl?: string;
  CQL_FILTER?: string;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
  enableMeasure?: boolean;
  enablePrint?: boolean;
  enableLegend?: boolean;
  enableLayerManager?: boolean;
  enableBaseMap?: boolean;
  enableSelectControl?: boolean;
  enableGeolocate?: boolean;
  selectControlIdProperty?: string;
  initialOpacity?: number;
  initialBaseMap?: "base" | "pdu" | "pos" | "satellite";
  wmsLayers?: string[];
  geoserverUrl?: string;
  workspace?: string;
  initialActiveLayers?: Array<{
    name: string;
    featureInfoRoute?: string;
    setIdInstead?: boolean;
    foreign?: boolean;
  }>;
  layerViewParams?: string;
  layerManagerPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

const MapContainer: React.FC<MapContainerProps> = ({
  enableZoom = true,
  enableFullscreen = true,
  enableMeasure = true,
  enablePrint = true,
  enableLegend = true,
  enableLayerManager = true,
  enableSelectControl = false,
  selectControlIdProperty = "",
  enableBaseMap = true,
  enableGeolocate = true,
  initialBaseMap = "base",
  initialOpacity = 1,
  initialActiveLayers,
  geoserverUrl = "",
  workspace = "",
  layerUrl,
  CQL_FILTER = "",
  layerViewParams,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const _pathname = usePathname();
  const mapIsLoading = useAppSelector(
    (state) => state.geoSelectedIds.mapIsLoading
  );
  const mapCount = useAppSelector((state) => state.geoSelectedIds.mapCount);
  const mapObject = useRef<Map | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);
  const selectInteractionRef = useRef<Select | null>(null);
  const wmsLayerRef = useRef<TileLayer<TileWMS> | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const geoJsonData = useAppSelector((state) => state.map.geoJSON);
  const isInitial = useAppSelector((state) => state.map.isInitial);
  const [MapReady, setMapReady] = useState(false);
  const geomType = useAppSelector((state) => state.map.geomType);
  const [drawType, setDrawType] = useState<
    "Point" | "LineString" | "Polygon" | null
  >(null);
  const [activeMode, setActiveMode] = useState<"draw" | "select" | null>(null);

  const highlightStyle = useMemo(() => {
    return new Style({
      fill: new Fill({
        color: "rgba(255, 255, 0, 0.3)",
      }),

      stroke: new Stroke({
        color: "#ffff00",
        width: 6,
      }),

      image: new CircleStyle({
        radius: 12.5,
        fill: new Fill({
          color: "rgba(255, 255, 0, 0.7)",
        }),
        stroke: new Stroke({
          color: "#ffffff",
          width: 2,
        }),
      }),
    });
  }, []);

  const selectionSourceRef = useRef(new VectorSource());
  const drawingSourceRef = useRef(new VectorSource());
  const initialLayersZIndexStart = useAppSelector(
    (state) => state.geoSelectedIds.initialLayersZIndexStart
  );

  const selectionLayerRef = useRef(
    new VectorLayer({
      source: selectionSourceRef.current,
      style: highlightStyle,
      zIndex: 100000 + initialLayersZIndexStart,
    })
  );

  const drawingLayerRef = useRef(
    new VectorLayer({
      source: drawingSourceRef.current,
      style: new Style({
        stroke: new Stroke({
          color: "#3399CC",
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(51, 153, 204, 0.2)",
        }),
      }),
      zIndex: 900,
    })
  );

  useEffect(() => {
    if (!selectionSourceRef.current) return;

    if (!geoJsonData) {
      selectionSourceRef.current.clear();
      mapObject.current?.getView().animate({
        zoom: 12,
        center: [579662.687, 443024.4034],
        duration: 300,
      });
      return;
    }

    if (isInitial) {
      try {
        const parsedGeoJson =
          typeof geoJsonData === "string"
            ? JSON.parse(geoJsonData)
            : geoJsonData;

        const fixedGeoJson = {
          ...parsedGeoJson,
          features: parsedGeoJson.features.map(
            (feature: { properties: any }) => {
              const { geometry, properties } = feature.properties || {};
              const cleanedProperties = properties || {};

              return {
                ...feature,
                geometry: geometry,
                properties: cleanedProperties,
              };
            }
          ),
        };

        const format = new GeoJSON();
        const features = format.readFeatures(fixedGeoJson, {
          dataProjection: "EPSG:32632",
          featureProjection: "EPSG:32632",
        });

        selectionSourceRef.current.clear();
        selectionSourceRef.current.addFeatures(features);

        const extent = selectionSourceRef.current.getExtent();
        if (extent && extent[0] !== Infinity && mapObject.current) {
          mapObject.current.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 1000,
          });
        }
      } catch (error) {
        console.error("Error rendering GeoJSON:", error);
        toast.error(t("map_data_not_loaded"));
      }
    }
  }, [geoJsonData, isInitial, t]);

  useWfsFeatureHighlighter(
    mapObject,
    layerUrl,
    CQL_FILTER,
    workspace,
    highlightStyle,
    MapReady
  );

  const getFeatureInfoAtPixel = async (pixel: number[], layerName: string) => {
    if (!mapObject.current || !wmsLayerRef.current) return;

    const view = mapObject.current.getView();
    const viewResolution = view.getResolution();
    const source = wmsLayerRef.current.getSource();

    const url = source?.getFeatureInfoUrl(
      mapObject.current.getCoordinateFromPixel(pixel),
      viewResolution || 1,
      view.getProjection(),
      {
        INFO_FORMAT: "application/json",
        QUERY_LAYERS: layerName,
      }
    );

    if (url) {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const format = new GeoJSON();
        const features = format.readFeatures(data, {
          dataProjection: "EPSG:32632",
          featureProjection: view.getProjection(),
        });

        drawingSourceRef.current.clear();

        drawingSourceRef.current.addFeatures(features);

        const extent = drawingSourceRef.current.getExtent();
        if (extent && extent[0] !== Infinity) {
          mapObject.current.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 750,
          });
        }
      } catch (error) {
        console.error("Erreur lors du GetFeatureInfo :", error);
        toast.error("Erreur lors de la récupération des entités.");
      }
    }
  };

  useEffect(() => {
    const map = mapObject.current;
    if (!map || !wmsLayerRef.current) return;

    const handleMapClick = (evt: any) => {
      if (activeMode === "draw") return; // Ne pas gérer les clics en mode dessin

      getFeatureInfoAtPixel(evt.pixel, layerUrl || "");
      if (!evt.coordinate) {
        selectionSourceRef.current.clear();
      }
    };

    map.on("singleclick", handleMapClick);

    return () => {
      map.un("singleclick", handleMapClick);
    };
  }, [layerUrl, activeMode]);

  // init map
  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,

      view: new View({
        center: [579662.687, 443024.4034],
        zoom: 12,
        minZoom: 12,
        maxZoom: 19,
        projection: "EPSG:32632",
        extent: [563000, 420000, 605000, 466000],
      }),
      layers: [],
      controls: [],
    });

    mapObject.current = map;
    map.addLayer(selectionLayerRef.current);
    map.addLayer(drawingLayerRef.current);

    map.once("postrender", () => {
      setMapReady(true);
    });

    return () => {
      setMapReady(false);
      map.setTarget(undefined);
    };
  }, [highlightStyle]);

  const clearInteractions = () => {
    const map = mapObject.current;
    if (!map) return;

    if (drawInteractionRef.current) {
      map.removeInteraction(drawInteractionRef.current);
      drawInteractionRef.current = null;
    }

    if (selectInteractionRef.current) {
      map.removeInteraction(selectInteractionRef.current);
      selectInteractionRef.current = null;
    }
  };

  const addDrawInteraction = (type: "Point" | "LineString" | "Polygon") => {
    if (activeMode === "draw" && drawType === type) {
      clearDrawing();
      setActiveMode(null);
      return;
    }

    clearInteractions();
    setActiveMode("draw");
    setDrawType(type);

    const map = mapObject.current;
    if (!map) return;

    const draw = new Draw({
      source: drawingSourceRef.current,
      type,
    });

    drawInteractionRef.current = draw;
    map.addInteraction(draw);
  };

  const clearDrawing = () => {
    drawingSourceRef.current.clear();
    setDrawType(null);
    setActiveMode(null);
    clearInteractions();
    dispatch(clearGeoJSON());
  };

  const validateDrawing = () => {
    const features = drawingSourceRef.current.getFeatures();
    if (!features.length) {
      toast.error(t("no_drawn_geometry"));
      return;
    }

    const format = new GeoJSON();
    const geoJson = format.writeFeatures(features);
    dispatch(setGeoJSON(geoJson));

    // Cloner les features pour les déplacer vers la couche de sélection
    const clonedFeatures = features.map((f) => f.clone());
    selectionSourceRef.current.clear();
    selectionSourceRef.current.addFeatures(clonedFeatures);

    // Zoom sur l'étendue des entités validées
    const extent = selectionSourceRef.current.getExtent();
    if (extent && extent[0] !== Infinity && mapObject.current) {
      mapObject.current.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 750,
      });
    }

    drawingSourceRef.current.clear();
    setDrawType(null);
    setActiveMode(null);
    clearInteractions();

    toast.success(t("drawing_validated"));
  };

  const selectInteraction = new Select({
    layers: (layer) => {
      return layer instanceof VectorLayer && layer.getVisible();
    },
    style: highlightStyle,
    condition: click,
  });

  mapObject.current?.addInteraction(selectInteraction);

  selectInteraction.on("select", (e) => {
    const selectedFeatures = e.target.getFeatures();
    selectionSourceRef.current.clear();
    selectionSourceRef.current.addFeatures(selectedFeatures.getArray());
  });

  useEffect(() => {
    const map = mapObject.current;
    if (!map) return;

    const handleSelectEvent = (e: any) => {
      const selectedFeatures = e.target.getFeatures();
      selectionSourceRef.current.clear();
      selectionSourceRef.current.addFeatures(selectedFeatures.getArray());
    };

    if (selectInteractionRef.current) {
      map.removeInteraction(selectInteractionRef.current);
    }

    if (enableSelectControl && activeMode === "select") {
      const select = new Select({
        condition: click,

        layers: [selectionLayerRef.current],
        style: highlightStyle,
      });

      select.on("select", handleSelectEvent);

      map.addInteraction(select);
      selectInteractionRef.current = select;
    } else {
    }

    return () => {
      if (mapObject.current && selectInteractionRef.current) {
        mapObject.current.removeInteraction(selectInteractionRef.current);

        selectInteractionRef.current = null;
      }
    };
  }, [
    mapObject,
    enableSelectControl,
    activeMode,
    highlightStyle,
    selectionLayerRef,
  ]);

  useEffect(() => {
    if (!mapObject.current) return;

    const selectInteraction = new Select({
      condition: click,
    });

    selectInteractionRef.current = selectInteraction;
    mapObject.current.addInteraction(selectInteraction);

    return () => {
      // Au démontage du composant, on retire bien l'interaction
      if (mapObject.current && selectInteractionRef.current) {
        mapObject.current.removeInteraction(selectInteractionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapObject.current) return;

    const layers = mapObject.current.getLayers().getArray();

    layers.forEach((layer: any) => {
      if (
        layer instanceof TileLayer &&
        layer.getVisible() &&
        layer.getSource() instanceof TileWMS
      ) {
        const source = layer.getSource();

        const currentParams = source.getParams();
        source.updateParams({
          ...currentParams,
          _refresh: new Date().getTime(),
        });
      }
    });

    mapObject.current.renderSync();
  }, [mapCount]);

  return (
    <div id="map-container" className="relative w-full h-screen">
      {mapIsLoading && (
        <div
          id="map-load"
          className="absolute w-full h-full z-[800] bg-white/50 flex items-center justify-center"
        >
          <div className="animate-spin">
            <LoaderCircle className="w-12 h-12 text-blue-500" />
          </div>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />
      <div
        id="scale-line-container"
        className="absolute top-[740px] left-[180px] z-30 bg-white/70 px-2 py-1 rounded text-xs"
      />
      <div
        id="overviewmap-container"
        className="absolute  top-[750px] left-2 z-20 bg-none border-0"
      />

      {mapObject.current && (
        <>
          <ScaleLineControlWrapper
            map={mapObject}
            targetId="scale-line-container"
          />
          <OverviewMapControlWrapper
            map={mapObject}
            targetId="overviewmap-container"
            initialCollapsed={false}
          />
        </>
      )}
      <div className="md:flex gap-10 absolute top-2 left-16 bg-white p-1 rounded-sm">
        <div className="flex">
          {geomType && (
            <div className="flex gap-x-2 text-xs md:text-sm">
              {geomType.map((g) => (
                <LoadingButton
                  key={g}
                  onClick={(e) => {
                    e.preventDefault();
                    addDrawInteraction(g);
                  }}
                  size="sm"
                  variant="outline"
                  className={`${g === drawType && "bg-accent"}`}
                >
                  {t(g)}
                </LoadingButton>
              ))}
            </div>
          )}
        </div>

        {geomType && drawType && (
          <div className="rounded-md flex justify-end gap-x-2">
            <LoadingButton
              disabled={drawingSourceRef.current.getFeatures().length > 0}
              onClick={(e) => {
                e.preventDefault();
                validateDrawing();
              }}
              size="sm"
            >
              {t("validate")}
            </LoadingButton>
            <LoadingButton
              onClick={(e) => {
                e.preventDefault();
                clearDrawing();
              }}
              size="sm"
              variant="secondary"
            >
              {t("clear")}
            </LoadingButton>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-start gap-4 z-30">
        {enableZoom && <ZoomControl map={mapObject} />}

        {enableSelectControl && (
          <SelectControl
            map={mapObject.current}
            activeLayers={initialActiveLayers}
            idPropertyName={selectControlIdProperty}
            geoserverUrl={geoserverUrl}
            workspace={workspace}
            highlightSource={selectionSourceRef.current}
            onActiveChange={(isActive: boolean) => {
              if (isActive) {
                setActiveMode("select");
                clearDrawing();
              } else if (activeMode === "select") {
                setActiveMode(null);
              }
            }}
          />
        )}
        {enableFullscreen && <FullscreenControl map={mapObject} />}
        {enableMeasure && <MeasureControl map={mapObject} />}
        {enablePrint && <PrintControl map={mapObject} />}
        {enableGeolocate && <GeolocateControl map={mapObject.current} />}
      </div>

      {enableLegend && <LegendControl map={mapObject} />}
      {enableLayerManager && activeMode !== "draw" && (
        <LayerManager
          map={mapObject}
          geoserverUrl={geoserverUrl}
          workspace={workspace}
          initialActiveLayers={initialActiveLayers}
          layerViewParams={layerViewParams}
        />
      )}
      {enableBaseMap && (
        <BaseMapControl
          map={mapObject}
          initialBaseMap={initialBaseMap}
          initialOpacity={initialOpacity}
        />
      )}
    </div>
  );
};

export default MapContainer;
