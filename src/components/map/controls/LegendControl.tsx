/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Map } from "ol";
import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import { FaList, FaXmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface LegendControlProps {
  map: React.MutableRefObject<Map | null>;
}

const LegendControl: React.FC<LegendControlProps> = ({ map }) => {
  const [legendUrls, setLegendUrls] = useState<
    { url: string; title: string }[]
  >([]);
  const [showPanel, setShowPanel] = useState(false);
  const [selectedLegend, setSelectedLegend] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const { t } = useTranslation();

  const updateLegend = useCallback(() => {
    const currentMap = map.current;
    if (!currentMap) return;

    const visibleLayers = currentMap
      .getLayers()
      .getArray()
      .filter(
        (l) =>
          l instanceof TileLayer &&
          (l as TileLayer<TileWMS>).getSource() instanceof TileWMS &&
          l.getVisible()
      ) as TileLayer<TileWMS>[];

    const urls = visibleLayers
      .map((layer) => {
        const source = layer.getSource();
        if (!source) return null;

        const layerName = source.getParams().LAYERS;
        const baseUrls = source.getUrls?.();
        if (!baseUrls || baseUrls.length === 0) return null;

        const baseUrl = baseUrls[0];
        // Extraction du nom de la couche sans le workspace
      let cleanLayerName = layerName || "";
      if (layerName?.includes(":")) {
        cleanLayerName = layerName.split(":")[1]; // Prend la partie après le ":"
      }
        const title = layer.get("title") || cleanLayerName || "Couche sans titre";

        if (!layerName) return null;

        const timestamp = Date.now();
        return {
          url: `${baseUrl}?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}&_=${timestamp}`,
          title: title,
        };
      })
      .filter(Boolean) as { url: string; title: string }[];

    setLegendUrls(urls);
  }, [map]);

  const handleLayerChange = useCallback(() => {
    if (!map.current) {
      console.warn("Map instance is not available");
      return;
    }

    updateLegend();

    try {
      // Utilisez requestRenderFrame au lieu de renderSync pour plus de sécurité
      map.current.render();
    } catch (error) {
      console.warn("Could not render map:", error);
    }
  }, [map, updateLegend]);

  useEffect(() => {
    const currentMap = map.current;
    if (!currentMap) return;

    updateLegend();

    const layerCollection = currentMap.getLayers();

    layerCollection.on("add", handleLayerChange);
    layerCollection.on("remove", handleLayerChange);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visibilityListener = (evt: any) => {
      if (evt.key === "visible") {
        handleLayerChange();
      }
    };

    const addVisibilityListeners = () => {
      layerCollection.getArray().forEach((layer) => {
        layer.on("propertychange", visibilityListener);
      });
    };

    addVisibilityListeners();

    return () => {
      if (!currentMap) return; // Vérification ajoutée
      layerCollection.un("add", handleLayerChange);
      layerCollection.un("remove", handleLayerChange);
      layerCollection.getArray().forEach((layer) => {
        layer.un("propertychange", visibilityListener);
      });
    };
  }, [map, updateLegend]);

    return (
    <div className="absolute top-5 left-4 z-20">
      <button
        onClick={() => {
          if (!showPanel) updateLegend();
          setShowPanel(!showPanel);
        }}
        className="bg-[#0F3342] text-white p-2 rounded shadow hover:scale-105 active:scale-100 transition"
        aria-label={t("toggle_legend_panel")}
      >
        <FaList size={24} />
      </button>

      {showPanel && (
        <div className="absolute left-16 top-0 w-[250px] bg-white rounded shadow-lg flex flex-col overflow-hidden">
          {/* Header fixe */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
            <span className="font-semibold text-sm">{t("legend")}</span>
            <button 
              onClick={() => setShowPanel(false)} 
              aria-label={t("close_panel")}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaXmark size={18} />
            </button>
          </div>

          {/* Contenu scrollable avec hauteur maximale */}
          <div className="flex-1 overflow-y-auto max-h-[300px] px-4 py-2">
            {legendUrls.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center">{t("visiblelayer")}</p>
            ) : (
              <ul className="space-y-3">
                {legendUrls.map((legend, index) => (
                  <li key={index} className="flex items-start gap-3 py-1">
                    <img
                      src={legend.url}
                      alt={`Légende de ${legend.title}`}
                      className="w-12 h-12 object-contain cursor-pointer flex-shrink-0"
                      onClick={() => setSelectedLegend(legend)}
                    />
                    <span className="text-sm text-gray-700 leading-tight mt-1 line-clamp-2">
                      {legend.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer fixe avec effet de fondu */}
          <div className="sticky bottom-0 bg-gradient-to-t from-white to-transparent h-6 pointer-events-none" />
        </div>
      )}

      {/* Modal (inchangé) */}
      <Dialog open={!!selectedLegend} onOpenChange={() => setSelectedLegend(null)}>
        <DialogContent showCloseButton={true}>
          <DialogTitle>{selectedLegend?.title}</DialogTitle>
          <div className="bg-white rounded shadow-lg p-4 max-w-full max-h-[80vh] overflow-auto">
            <img
              src={selectedLegend?.url}
              alt={`Légende de ${selectedLegend?.title}`}
              className="max-w-full max-h-[75vh] object-contain mx-auto"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LegendControl;
