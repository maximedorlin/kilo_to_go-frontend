// hooks/useWfsFeatureHighlighter.ts
import { useCallback, useEffect, useRef } from "react";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style } from "ol/style";
import toast from "react-hot-toast";
import { useAppDispatch } from "./redux-toolkit";
import { setMapIsLoading } from "@/store/slices/tables-pagiations-slices/geoSelectedIds.slice";
import { useAppSelector } from "./redux-toolkit";

export function useWfsFeatureHighlighter(
  mapRef: React.RefObject<Map | null>,
  layerUrl?: string,
  CQL_FILTER?: string,
  workspace?: string,
  highlightStyle?: Style,
  isMapReady?: boolean
) {
  const tempHighlightSourceRef = useRef(new VectorSource());
  const tempHighlightLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const dispatch = useAppDispatch();
  const initialLayersZIndexStart = useAppSelector(
    (state) => state.geoSelectedIds.initialLayersZIndexStart
  );
  const initTempHighlightLayer = useCallback(() => {
    if (!mapRef.current || !highlightStyle) return;

    if (tempHighlightLayerRef.current) {
      mapRef.current.removeLayer(tempHighlightLayerRef.current);
    }

    const layer = new VectorLayer({
      source: tempHighlightSourceRef.current,
      opacity: 1,
      style: highlightStyle,
      zIndex: initialLayersZIndexStart + 10,
      renderBuffer: 1000,
    });

    mapRef.current.addLayer(layer);
    tempHighlightLayerRef.current = layer;
  }, [mapRef, highlightStyle, initialLayersZIndexStart]);

  useEffect(() => {
    if (
      !isMapReady ||
      !mapRef.current ||
      !layerUrl ||
      !CQL_FILTER ||
      !workspace
    ) {
      tempHighlightSourceRef.current.clear();
      mapRef.current?.getView().animate({
        zoom: 12,
        center: [579662.687, 443024.4034],
        duration: 300,
      });
      return;
    }
    const wfsUrl = `${process.env.NEXT_PUBLIC_GEOSERVER_URL}${workspace}/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=${layerUrl}&outputFormat=application/json&CQL_FILTER=${CQL_FILTER}`;
    dispatch(setMapIsLoading({ mapIsLoading: true }));
    fetch(wfsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const format = new GeoJSON();
        const features = format.readFeatures(data, {
          dataProjection: "EPSG:32632",
          featureProjection: mapRef.current!.getView().getProjection(),
        });

        tempHighlightSourceRef.current.clear();

        if (features.length === 0) {
        } else {
          tempHighlightSourceRef.current.addFeatures(features);

          const extent = tempHighlightSourceRef.current.getExtent();
          if (extent && extent[0] !== Infinity && mapRef.current) {
            mapRef.current.getView().fit(extent, {
              padding: [50, 50, 50, 50],
              maxZoom: 18,
              duration: 750,
            });
          }
        }
        dispatch(setMapIsLoading({ mapIsLoading: false }));
      })
      .catch((error) => {
        dispatch(setMapIsLoading({ mapIsLoading: false }));
        console.error("Error fetching WFS features in hook:", error);
        toast.error("Error fetching WFS features for highlight.");
      });

    initTempHighlightLayer();

    return () => {
      tempHighlightSourceRef.current.clear();
    };
  }, [
    isMapReady,
    mapRef,
    layerUrl,
    CQL_FILTER,
    workspace,
    initTempHighlightLayer,
    dispatch,
  ]);
}
