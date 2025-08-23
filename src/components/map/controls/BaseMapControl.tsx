"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { FaMap, FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { fromLonLat } from "ol/proj";
import { FaSlidersH } from "react-icons/fa";
import { Slider } from "@/components/ui/slider";
import { IMAGES } from "@/constants/images";
import usePersistentBaseMap from "@/hooks/use-persistentBaseMap";

interface BaseMapControlProps {
  map: React.MutableRefObject<Map | null>;
  initialBaseMap?: string;
  initialOpacity?: number;
}

interface BaseMapOption {
  id: string;
  title: string;
  thumbnail: string | any;
  layer: TileLayer<XYZ >;
}

const BaseMapControl: React.FC<BaseMapControlProps> = ({
  initialBaseMap = "base",
  initialOpacity = 1,
  map,
}) => {
  const { t } = useTranslation();
  const [showPanel, setShowPanel] = useState(false);
  const [currentBaseMap, setCurrentBaseMap] =
    usePersistentBaseMap(initialBaseMap);
  const [showOpacityControl, setShowOpacityControl] = useState(false);
  const [opacity, setOpacity] = useState<number>(initialOpacity);
  const [baseMapOptions, setBaseMapOptions] = useState<BaseMapOption[]>([]);
  const thumbnailRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const thumbnailMaps = useRef<{ [key: string]: Map | null }>({});
  const [mapCurrent, setMapCurrent] = useState(false);



  // Fonction pour initialiser une mini-carte
  const initThumbnailMap = useCallback(
    (id: string) => {
      if (!map.current || !thumbnailRefs.current[id]) return;

      const option = baseMapOptions.find((o) => o.id === id);
      if (!option) return;

      const mainView = map.current.getView();
      const center = mainView.getCenter();
      const zoom = mainView.getZoom();

      // Supprimer la carte existante si elle existe
      if (thumbnailMaps.current[id]) {
        thumbnailMaps.current[id]?.setTarget(undefined);
        thumbnailMaps.current[id]?.dispose();
      }

      const thumbnailMap = new Map({
        target: thumbnailRefs.current[id]!,
        layers: [
          new TileLayer({
            source: option.layer.getSource()!,
          }),
        ],
        view: new View({
          projection: mainView.getProjection(),
          center: center || fromLonLat([0, 0], mainView.getProjection()),
          zoom: zoom ? Math.max(zoom - 3, 1) : 1,
          constrainResolution: true,
        }),
        controls: [],
        interactions: [],
      });

      thumbnailMaps.current[id] = thumbnailMap;

      // Forcer le rendu et s'assurer que la taille est correcte
      setTimeout(() => {
        thumbnailMap.updateSize();
      }, 50);
    },
    [baseMapOptions, map]
  );
  const createLayer = (
    id: string,
    source: any,
    visible: boolean,
    layerOpacity: number
  ) => {
    const layer = new TileLayer({ source, visible, opacity: layerOpacity });
    layer.set("id", id);
    return layer;
  };
  // Fonction pour gérer les refs des mini-cartes
  const setThumbnailRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      if (el) {
        thumbnailRefs.current[id] = el;
        // Initialiser la mini-carte lorsque la ref est disponible
        if (baseMapOptions.length > 0) {
          initThumbnailMap(id);
        }
      } else {
        if (thumbnailMaps.current[id]) {
          thumbnailMaps.current[id]?.setTarget(undefined);
          thumbnailMaps.current[id]?.dispose();
          delete thumbnailMaps.current[id];
        }
        delete thumbnailRefs.current[id];
      }
    },
    [baseMapOptions, initThumbnailMap]
  );

  useEffect(() => {
    if (map.current) {
      setMapCurrent(true);
    }
  }, [map]);
  // Mettre à jour les mini-cartes quand la vue principale change
  useEffect(() => {
    if (!map.current) return;

    const updateThumbnails = () => {
      const view = map.current!.getView();
      const center = view.getCenter();
      const zoom = view.getZoom();

      Object.entries(thumbnailMaps.current).forEach(([_, thumbMap]) => {
        if (thumbMap) {
          const thumbView = thumbMap.getView();
          thumbView.setCenter(
            center || fromLonLat([0, 0], view.getProjection())
          );
          thumbView.setZoom(Math.max((zoom || 1) - 3, 1));
          thumbMap.updateSize();
        }
      });
    };

    // Mettre à jour immédiatement et sur les mouvements
    updateThumbnails();
    map.current.on("moveend", updateThumbnails);

    return () => {
      map.current?.un("moveend", updateThumbnails);
    };
  }, [map]);

  const layers = useMemo(() => {
    return [
      createLayer(
        "base",
        new XYZ({
          url: `${process.env.NEXT_PUBLIC_BASEMAP}`,
        }),
        currentBaseMap === "base",
        opacity
      ),
      createLayer(
        "pdu",
        new XYZ({
          url: `${process.env.NEXT_PUBLIC_PDU_BASEMAP}`,
        }),
        currentBaseMap === "pdu",
        opacity
      ),
      createLayer(
        "pos",
        new XYZ({
          url: `${process.env.NEXT_PUBLIC_POS_BASEMAP}`,
        }),
        currentBaseMap === "pos",
        opacity
      ),
createLayer(
  "satellite",
  new XYZ({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  }),
  currentBaseMap === "satellite",
  opacity
),
    ];
  }, [currentBaseMap, opacity]);

  const initBaseLayers = useCallback(() => {
    if (!map.current) return;

    const existingLayers = map.current
      .getLayers()
      .getArray()
      .filter((l) => ["base", "pdu", "pos", "satellite"].includes(l.get("id")));

    existingLayers.forEach((l) => map.current?.removeLayer(l));

    layers.forEach((layer) => map.current?.getLayers().insertAt(0, layer));
    // };
  }, [layers, map]);

  // Réinitialiser les mini-cartes quand le panneau s'ouvre
  useEffect(() => {
    if (showPanel) {
      Object.keys(thumbnailRefs.current).forEach((id) => {
        if (thumbnailRefs.current[id] && baseMapOptions.length > 0) {
          initThumbnailMap(id);
        }
      });
    }
  }, [showPanel, baseMapOptions, initThumbnailMap]);

  const checkMap = useMemo(() => {
    return () => {
      if (map.current) {
        initBaseLayers();
      } else {
        setTimeout(checkMap, 100);
      }
    };
  }, [initBaseLayers, map]);

  useEffect(() => {
    // Attendre que la carte soit disponible
    console.log("CHECK MAP");
    checkMap();

    return () => {
      // Nettoyage
      if (map.current) {
        const layers = map.current.getLayers().getArray();
        layers.forEach((layer) => {
          if (["base", "pdu", "pos", "satellite"].includes(layer.get("id"))) {
            map.current?.removeLayer(layer);
          }
        });
      }
    };
  }, [map, initialBaseMap, checkMap]);

  useEffect(() => {
    if (!map.current) return;

    const baseLayers = map.current
      .getLayers()
      .getArray()
      .filter((layer) =>
        ["base", "pdu", "pos", "satellite"].includes(layer.get("id"))
      );

    baseLayers.forEach((layer) => {
      layer.setOpacity(opacity);
    });
  }, [opacity, map]);

  useEffect(() => {
    // if (!map.current) {
    //   console.warn("Map instance is not available in BaseMapControl");
    //   return;
    // }

    const existingBaseLayers = map?.current
      ? map?.current
          .getLayers()
          .getArray()
          .filter((layer) =>
            ["base", "pdu", "pos", "satellite"].includes(layer.get("id"))
          )
      : [];

    existingBaseLayers.forEach((layer) => map.current?.removeLayer(layer));

const satelliteLayer = new TileLayer({
  source: new XYZ({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  }),
  visible: currentBaseMap === "satellite",
  properties: {
    id: "satellite",
    title: "Satellite (Esri)",
    thumbnail: "ok",
  },
});

    const baseLayer = new TileLayer({
      source: new XYZ({
        url: `${process.env.NEXT_PUBLIC_BASEMAP}`,
        attributions: "Tiles © CUD",
      }),
      visible: currentBaseMap === "base",
      properties: {
        id: "base",
        title: "Imagerie",
        thumbnail: IMAGES.base,
      },
    });

    const pduLayer = new TileLayer({
      source: new XYZ({
        url: `${process.env.NEXT_PUBLIC_PDU_BASEMAP}`,
        attributions: "Tiles © CUD",
      }),
      visible: currentBaseMap === "pdu",
      properties: {
        id: "pdu",
        title: "PDU",
      },
    });

    const posLayer = new TileLayer({
      source: new XYZ({
        url: `${process.env.NEXT_PUBLIC_POS_BASEMAP}`,
        attributions: "Tiles © CUD",
      }),
      visible: currentBaseMap === "pos",
      properties: {
        id: "pos",
        title: "POS",
      },
    });

    setBaseMapOptions([
      {
        id: "base",
        title: "Imagerie",
        thumbnail: IMAGES.base,
        layer: baseLayer,
      },
      {
        id: "pdu",
        title: "PDU",
        thumbnail: IMAGES.pdu,
        layer: pduLayer,
      },
      {
        id: "pos",
        title: "POS",
        thumbnail: IMAGES.pos,
        layer: posLayer,
      },
      {
        id: "satellite",
        title: "Satellite",
        thumbnail: "ok",
        layer: satelliteLayer,
      },
    ]);

    // Ajouter les couches à la carte
    map.current?.addLayer(baseLayer);
    map.current?.addLayer(pduLayer);
    map.current?.addLayer(posLayer);
    map.current?.addLayer(satelliteLayer);

    return () => {
      map.current?.removeLayer(baseLayer);
      map.current?.removeLayer(pduLayer);
      map.current?.removeLayer(posLayer);
      map.current?.removeLayer(satelliteLayer);
    };
  }, [map, initialBaseMap, mapCurrent]);

  const switchBaseMap = (id: string) => {
    if (!map.current) return;

    const baseLayers = map.current
      .getLayers()
      .getArray()
      .filter((layer) =>
        ["base", "pdu", "pos", "satellite"].includes(layer.get("id"))
      );

    baseLayers.forEach((layer) => {
      layer.setVisible(layer.get("id") === id);
    });

    setCurrentBaseMap(id);
  };

  // Initialiser les mini-cartes quand les options de baseMap changent
  useEffect(() => {
    if (baseMapOptions.length > 0) {
      baseMapOptions.forEach((option) => {
        if (thumbnailRefs.current[option.id]) {
          initThumbnailMap(option.id);
        }
      });
    }
  }, [baseMapOptions, initThumbnailMap]);

  return (
    <div className="absolute top-[425px] left-4 z-20">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="bg-[#0F3342] text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition"
        aria-label={t("toggle_basemap_panel")}
      >
        <FaMap size={24} />
      </button>

      {showPanel && (
        <div className="absolute left-16 top-0 w-[250px] bg-white rounded shadow flex flex-col overflow-hidden">
          <div className="flex justify-between items-center px-4 py-2 border-b sticky top-0 bg-white z-10">
            <span className="font-semibold text-sm">{t("basemap")}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOpacityControl(!showOpacityControl)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={t("adjust_opacity")}
              >
                <FaSlidersH size={18} />
              </button>
              <button
                onClick={() => setShowPanel(false)}
                aria-label={t("close_panel")}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaXmark size={18} />
              </button>
            </div>
          </div>

          {showOpacityControl && (
            <div className="px-4 py-3 border-b">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                {t("opacity")}: {Math.round(opacity * 100)}%
              </label>
              <Slider
                value={[opacity]}
                min={0.1}
                max={1}
                step={0.1}
                onValueChange={(value) => setOpacity(value[0])}
                className="w-full"
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2">
            <div className="grid grid-cols-2 gap-2">
              {baseMapOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => switchBaseMap(option.id)}
                  className={`p-2 border rounded transition ${
                    currentBaseMap === option.id
                      ? "border-[#0F3342] bg-blue-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  aria-label={`Basemap ${option.title}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      ref={setThumbnailRef(option.id)}
                      className="w-full h-16 mb-1 relative bg-gray-100"
                      style={{
                        opacity: currentBaseMap === option.id ? opacity : 1,
                      }}
                    />
                    <span className="text-xs text-center">
                      {t(option.title)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseMapControl;
