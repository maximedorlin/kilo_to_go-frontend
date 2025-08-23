/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Map } from "ol";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import {
  FaLayerGroup,
  FaXmark,
  FaArrowUp,
  FaArrowDown,
  FaMagnifyingGlass,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { useRouter } from "next/navigation";
import { setPublicViewParamsLayerData } from "@/store/slices/publicLightingViewParamsSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setInitialLayersZIndexStart } from "@/store/slices/tables-pagiations-slices/geoSelectedIds.slice";
import Image from "next/image";

interface LayerInfo {
  name: string;
  title: string;
  index: number;
  featureInfoRoute?: string;
}

interface LayerManagerProps {
  map: React.MutableRefObject<Map | null>;
  geoserverUrl: string;
  workspace: string;
  initialActiveLayers?: Array<{
    name: string;
    featureInfoRoute?: string;
    setIdInstead?: boolean;
    foreign?: boolean;
  }>;
  layerViewParams?: string;
}

const LayerManager: React.FC<LayerManagerProps> = ({
  map,
  geoserverUrl,
  workspace,
  initialActiveLayers = [],
  layerViewParams,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [layers, setLayers] = useState<LayerInfo[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [activeLayers, setActiveLayers] = useState<string[]>([]);
  const isInitial = useAppSelector((state) => state.map.isInitial);
  const [selectedParamId, setSelectedParamId] = useState("");
  const dispatch = useAppDispatch();
  const hoverTimeoutRef = useRef<number | null>(null);
  const lastPixelRef = useRef<[number, number] | null>(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [featureProps, setFeatureProps] = useState<any>(null);

  useEffect(() => {
    dispatch(
      setPublicViewParamsLayerData({
        selectedParamId: selectedParamId,
      })
    );
  }, [dispatch, selectedParamId]);

  useEffect(() => {
    if (isInitial) {
      initialActiveLayers.forEach(({ name }) => {
        const layer = getLayerByName(name);
        if (layer) {
          layer.setVisible(true);
          const layerConfig = initialActiveLayers.find((l) => l.name === name);
          if (layerConfig?.featureInfoRoute || layerConfig?.setIdInstead) {
            setupGetFeatureInfo(
              name,
              layerConfig.featureInfoRoute,
              layerConfig.setIdInstead,
              layerConfig.foreign
            );
          }
        }
      });
      setActiveLayers((prev) => [
        ...prev,
        ...initialActiveLayers.map((l) => l.name),
      ]);
    }
  }, [isInitial, initialActiveLayers]);

  const getLayerByName = (name: string) => {
    return map.current
      ?.getLayers()
      .getArray()
      .find((l) => l.get("name") === name && !l.get("isBaseMap")) as
      | TileLayer<TileWMS>
      | undefined;
  };

  const setupPopoverOnHover = (activeLayerNames: string[]) => {
    if (!map.current) return;
    const olMap = map.current;

    const onPointerMove = (evt: any) => {
      const pixel: [number, number] = evt.pixel;
      lastPixelRef.current = pixel;

      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
      setPopoverOpen(false);
      setFeatureProps(null);

      hoverTimeoutRef.current = window.setTimeout(async () => {
        hoverTimeoutRef.current = null;

        const visibleLayers = activeLayerNames
          .map((name) => getLayerByName(name))
          .filter((lyr): lyr is TileLayer<TileWMS> =>
            Boolean(lyr && lyr.getVisible())
          );
        if (visibleLayers.length === 0) return;

        const view = olMap.getView();
        if (!view) return;

        for (const layer of visibleLayers) {
          const source = layer.getSource();
          if (!source) continue;

          const url = source.getFeatureInfoUrl(
            evt.coordinate,
            view.getResolution() || 0,
            view.getProjection(),
            {
              INFO_FORMAT: "application/json",
              FEATURE_COUNT: 1,
            }
          );
          if (!url) continue;

          try {
            const r = await fetch(url);
            const data = await r.json();
            if (data.features && data.features.length > 0) {
              setFeatureProps(data.features[0].properties || data.features[0]);
              setPopoverPosition({ x: pixel[0], y: pixel[1] });
              setPopoverOpen(true);
              break;
            }
          } catch {}
        }
      }, 500);
    };

    olMap.on("pointermove", onPointerMove);
    const onCancelHover = () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setPopoverOpen(false);
    };
    olMap.on("pointerdrag", onCancelHover);
    olMap.on("click", onCancelHover);

    return () => {
      olMap.un("pointermove", onPointerMove);
      olMap.un("pointerdrag", onCancelHover);
      olMap.un("click", onCancelHover);
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  };

  useEffect(() => {
    setupPopoverOnHover(activeLayers);
  }, [activeLayers]);

  const setupGetFeatureInfo = (
    layerName: string,
    featureInfoRoute?: string,
    setIdInstead?: boolean,
    foreign?: boolean
  ) => {
    if (!map.current) return;

    const layer = getLayerByName(layerName);
    if (!layer) return;

    map.current.on("click", (evt) => {
      if (!layer.getVisible()) return;

      const view = map.current?.getView();
      const source = layer.getSource();

      if (!view || !source) return;

      const url = source.getFeatureInfoUrl(
        evt.coordinate,
        view.getResolution() || 0,
        view.getProjection(),
        {
          INFO_FORMAT: "application/json",
          FEATURE_COUNT: 1,
        }
      );

      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              if (setIdInstead) {
                return setSelectedParamId(data.features[0].id.split(".").pop());
              }
              if (foreign === true) {
                return router.push(
                  `${featureInfoRoute}${data.features[0].properties.id}`
                );
              }

              router.push(
                `${featureInfoRoute}${data.features[0].id.split(".").pop()}`
              );
            }
          })
          .catch(console.error);
      }
    });
  };

  const initialLayerOrderMap = React.useMemo(() => {
    const map: Record<string, number> = {};
    initialActiveLayers.forEach(({ name }, idx) => {
      map[name] = idx;
    });
    return map;
  }, [initialActiveLayers]);

  const reorderMapLayers = (newLayerOrder: LayerInfo[]) => {
    const mapLayers = map.current?.getLayers();
    if (!mapLayers) return;

    const baseLayer = getLayerByName("FondDeCarte");
    if (baseLayer) {
      baseLayer.setZIndex(0);
    }

    const initialLayersZIndexStart = 1000;
    const initialLayersCount = initialActiveLayers.length;

    // Applique un zIndex décroissant pour initialActiveLayers (pour que couche1 soit au-dessus)
    initialActiveLayers.forEach(({ name }, idx) => {
      const layer = getLayerByName(name);
      if (layer) {
        layer.setZIndex(initialLayersZIndexStart + (initialLayersCount - idx));
      }
    });
    dispatch(
      setInitialLayersZIndexStart({
        initialLayersZIndexStart: initialLayersZIndexStart,
      })
    );

    let nonInitialIndex = 0;
    newLayerOrder.forEach((layerInfo) => {
      if (!initialLayerOrderMap.hasOwnProperty(layerInfo.name)) {
        const layer = getLayerByName(layerInfo.name);
        if (layer) {
          layer.setZIndex(1 + nonInitialIndex);
          nonInitialIndex++;
        }
      }
    });

    mapLayers.getArray().forEach((l, idx) => {
      console.log(`Index ${idx} : ${l.get("name")} (ZIndex: ${l.getZIndex()})`);
    });
  };

  const toggleLayer = (layerName: string) => {
    const existingLayer = getLayerByName(layerName);

    if (existingLayer) {
      const newVisibility = !existingLayer.getVisible();
      existingLayer.setVisible(newVisibility);

      if (newVisibility && layerViewParams) {
        existingLayer
          .getSource()
          ?.updateParams({ VIEWPARAMS: `${layerViewParams}` });
      }

      map.current?.renderSync();

      setActiveLayers((prev) =>
        newVisibility
          ? [...prev, layerName]
          : prev.filter((l) => l !== layerName)
      );
    } else if (layerViewParams) {
      const layer = new TileLayer({
        source: new TileWMS({
          url: `${geoserverUrl}/${workspace}/wms`,
          params: {
            LAYERS: layerName,
            TILED: true,
            VERSION: "1.1.1",
            VIEWPARAMS: `${layerViewParams}`,
          },
          serverType: "geoserver",
          crossOrigin: "anonymous",
        }),
        visible: true,
      });
      layer.set("name", layerName);
      map.current?.addLayer(layer);
      map.current?.renderSync();
      setActiveLayers((v) => [...v, layerName]);
      setLayers((pl) => {
        if (!pl.find((l) => l.name === layerName)) {
          const updated = [
            ...pl,
            { name: layerName, title: layerName, index: pl.length },
          ];
          reorderMapLayers(updated);
          return updated;
        }
        return pl;
      });
    } else {
      const newLayer = new TileLayer({
        source: new TileWMS({
          url: `${geoserverUrl}/${workspace}/wms`,
          params: {
            LAYERS: layerName,
            TILED: true,
            VERSION: "1.1.1",
          },
          serverType: "geoserver",
          crossOrigin: "anonymous",
        }),
        visible: true,
      });

      newLayer.set("name", layerName);
      map.current?.addLayer(newLayer);

      // map.current?.renderSync();

      setActiveLayers((prev) => [...prev, layerName]);

      setLayers((prevLayers) => {
        const exists = prevLayers.find((l) => l.name === layerName);
        if (!exists) {
          const updatedLayers = [
            ...prevLayers,
            { name: layerName, title: layerName, index: prevLayers.length },
          ];
          reorderMapLayers(updatedLayers);
          return updatedLayers;
        }
        return prevLayers;
      });
    }
  };

  const adjustLayerOrder = (layerName: string, direction: "up" | "down") => {
    setLayers((prevLayers) => {
      const index = prevLayers.findIndex((layer) => layer.name === layerName);
      if (index === -1) return prevLayers;

      const newIndex =
        direction === "up"
          ? index - 1
          : direction === "down"
          ? index + 1
          : index;

      if (newIndex < 0 || newIndex >= prevLayers.length) return prevLayers;

      const updatedLayers = [...prevLayers];
      const [movedLayer] = updatedLayers.splice(index, 1);
      updatedLayers.splice(newIndex, 0, movedLayer);

      const baseLayer = getLayerByName("FondDeCarte");
      if (baseLayer) {
        baseLayer.setZIndex(0);
      }

      const dataLayerCount = updatedLayers.length;

      updatedLayers.forEach((layerInfo, idx) => {
        const layer = getLayerByName(layerInfo.name);
        if (layer) {
          const zIndex = dataLayerCount - idx;
          layer.setZIndex(zIndex);
          console.log(`Layer ${layerInfo.name} → ZIndex ${zIndex}`);
        }
      });

      return updatedLayers.map((layer, idx) => ({ ...layer, index: idx }));
    });
  };

  const fetchLayers = async () => {
    try {
      const response = await fetch("/getcapabilities.xml");

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const text = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");

      const layerNodes = Array.from(xml.getElementsByTagName("Layer"))
        .slice(1)
        .filter((layer) => {
          const name = layer.getElementsByTagName("Name")[0]?.textContent;
          return name?.split(":")[0] === workspace;
        });

      const availableLayers = layerNodes
        .map((layer, idx) => {
          const name = layer.getElementsByTagName("Name")[0]?.textContent || "";
          const title =
            layer.getElementsByTagName("Title")[0]?.textContent || "";
          return {
            name,
            title,
            index: idx,
            featureInfoRoute: initialActiveLayers.find((l) => l.name === name)
              ?.featureInfoRoute,
          };
        })
        .filter((l) => l.name);

      setLayers(availableLayers);
    } catch (err) {
      console.error("Error fetching layers:", err);
    }
  };

  useEffect(() => {
    fetchLayers();
    return () => {
      activeLayers.forEach((layerName) => {
        const layer = getLayerByName(layerName);
        if (layer) map.current?.removeLayer(layer);
      });
    };
  }, [geoserverUrl, workspace, initialActiveLayers]);

  useEffect(() => {
    if (layers.length && initialActiveLayers.length) {
      const [initialLayerInfos, remainingLayerInfos] = layers.reduce(
        ([init, rem], layer) =>
          initialActiveLayers.some((l) => l.name === layer.name)
            ? [[...init, layer], rem]
            : [init, [...rem, layer]],
        [[], []] as [LayerInfo[], LayerInfo[]]
      );

      const ordered = [...initialLayerInfos, ...remainingLayerInfos];
      const needsReorder =
        layers.map((l) => l.name).join() !== ordered.map((l) => l.name).join();

      if (needsReorder) {
        const orderedWithIndex = ordered.map((l, i) => ({ ...l, index: i }));
        setLayers(orderedWithIndex);

        reorderMapLayers(orderedWithIndex);
      }

      initialLayerInfos.forEach((layerInfo) => {
        const layer = getLayerByName(layerInfo.name);
        if (!layer?.getVisible()) {
          toggleLayer(layerInfo.name);
        }

        const config = initialActiveLayers.find(
          (l) => l.name === layerInfo.name
        );
        if (config?.featureInfoRoute || config?.setIdInstead) {
          setupGetFeatureInfo(
            layerInfo.name,
            config.featureInfoRoute,
            config.setIdInstead,
            config.foreign
          );
        }
      });
    }
  }, [layers, initialActiveLayers]);

  const layersForPanel = layers
    .filter((layer) => !initialActiveLayers.some((l) => l.name === layer.name))
    .filter((layer) => {
      if (searchQuery.trim().length < 3) return true;
      const lower = searchQuery.toLowerCase();
      return (
        layer.name.toLowerCase().includes(lower) ||
        layer.title.toLowerCase().includes(lower)
      );
    });

  return (
    <>
      <div className="absolute top-40 left-4 z-20">
        <button
          onClick={() => {
            const next = !showPanel;
            setShowPanel(next);
            if (!next) {
              // Si on ferme le panel, on réinitialise
              setSearchQuery("");
              setShowSearchInput(false);
            }
          }}
          className="bg-[#0F3342] text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition"
          aria-label={t("toggle_layer_panel")}
        >
          <FaLayerGroup size={24} />
        </button>
        {showPanel && (
          <div className="absolute left-16 top-0 w-[250px] h-[250px] bg-white rounded shadow flex flex-col overflow-hidden">
            {/* En-tête sticky */}
            <div className="flex justify-between items-center px-4 py-2 border-b sticky top-0 bg-white z-10">
              <span className="font-semibold text-sm">
                {t("layersavailable")}
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => {
                    setShowSearchInput((prev) => {
                      if (prev) setSearchQuery(""); // clear si on masque
                      return !prev;
                    });
                  }}
                  aria-label={t("search")}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaMagnifyingGlass size={18} />
                </button>
                <button
                  onClick={() => {
                    setShowPanel(false);
                    setSearchQuery("");
                    setShowSearchInput(false);
                  }}
                  aria-label={t("close_panel")}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaXmark size={18} />
                </button>
              </div>
            </div>
            {showSearchInput && (
              <div className="border-t border-gray-200 px-4 py-2 bg-white">
                <input
                  type="text"
                  placeholder={t("search_layers")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              </div>
            )}
<div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
  {layersForPanel.length === 0 ? (
    <p className="text-sm text-gray-500">{t("loading_layers")}</p>
  ) : (
    <div className="space-y-2">
      {layersForPanel.map((layer, idx) => (
        <div
          key={layer.name}
          className={`flex justify-between items-center pb-2 ${
            idx < layersForPanel.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <span
            className="text-sm w-4/5 break-words line-clamp-4 leading-snug"
            title={layer.title}
          >
            {t(layer.title)}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => toggleLayer(layer.name)}
              className={`text-xs rounded px-2 py-1 min-w-[20px] text-white transition flex items-center justify-center ${
                activeLayers.includes(layer.name)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {activeLayers.includes(layer.name) ? (
                <FaTrash size={14} />
              ) : (
                <FaPlus size={14} />
              )}
            </button>
            {activeLayers.includes(layer.name) && (
              <div className="flex flex-col items-center space-y-1">
                {layer.index > 0 && (
                  <button
                    onClick={() => adjustLayerOrder(layer.name, "up")}
                    className="text-xs text-[#0F3342] hover:text-blue-600"
                    aria-label={t("move_up")}
                  >
                    <FaArrowUp size={14} />
                  </button>
                )}
                {layer.index < layers.length - 1 && (
                  <button
                    onClick={() => adjustLayerOrder(layer.name, "down")}
                    className="text-xs text-[#0F3342] hover:text-blue-600"
                    aria-label={t("move_down")}
                  >
                    <FaArrowDown size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

          </div>
        )}
      </div>
      {featureProps && (
        <div
          style={{
            position: "absolute",
            left: popoverPosition.x,
            top: popoverPosition.y,
            width: 0,
            height: 0,
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <span />
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="max-w-xs">
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {"picture" in featureProps && featureProps.picture && (
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_BACKEND_URL_SIMPLE}media/` +
                      featureProps.picture
                    }
                    alt={featureProps.id || ""}
                    width={100}
                    height={100}
                    className="w-3/4 h-auto mx-auto object-cover rounded-sm"
                    unoptimized
                  />
                )}
                {Object.entries(featureProps).map(([key, value]) => {
                  const omitFields = ["created_at", "updated_at", "id", "Id"];
                  if (omitFields.includes(key)) return;
                  if (key.endsWith("id")) return;
                  return (
                    <div key={key} className="flex justify-between gap-3">
                      <span className="font-semibold text-sm">{t(key)}</span>
                      <span className="text-sm text-gray-700 text-right">
                        {t(String(value))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
};

export default LayerManager;
