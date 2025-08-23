"use client";
import React from "react";
import { LoadingButton } from "../../ui/loading-btn"; 
import { useTranslation } from "react-i18next";
import VectorSource from "ol/source/Vector";

type GeometryType = "Point" | "LineString" | "Polygon";

interface DrawingToolbarProps {
  geomType: GeometryType[] | null;
  activeDrawType: GeometryType | null;
  drawingSource: VectorSource | null; 
  onDrawInteractionChange: (type: GeometryType) => void;
  onValidateDrawing: () => void;
  onClearDrawing: () => void;
}

const DrawingToolbar: React.FC<DrawingToolbarProps> = ({
  geomType,
  activeDrawType,
  drawingSource,
  onDrawInteractionChange,
  onValidateDrawing,
  onClearDrawing,
}) => {
  const { t } = useTranslation();

  if (!geomType) {
    return null;
  }

  return (
    <div className="md:flex gap-10 absolute top-2 left-16 bg-white p-1 rounded-sm shadow"> 
      <div className="flex">
        <div className="flex gap-x-2 text-xs md:text-sm">
          {geomType.map((g) => (
            <LoadingButton
              key={g}
              onClick={(e) => {
                e.preventDefault();
                onDrawInteractionChange(g);
              }}
              size="sm"
              variant="outline"
              className={`${g === activeDrawType && "bg-accent"}`}
            >
              {t(g)}
            </LoadingButton>
          ))}
        </div>
      </div>

      {activeDrawType && (
        <div className="rounded-md flex justify-end gap-x-2 mt-2 md:mt-0 md:ml-2"> 
          <LoadingButton
            disabled={!drawingSource || drawingSource.getFeatures().length === 0}
            onClick={(e) => {
              e.preventDefault();
              onValidateDrawing();
            }}
            size="sm"
          >
            {t("validate")}
          </LoadingButton>
          <LoadingButton
            onClick={(e) => {
              e.preventDefault();
              onClearDrawing();
            }}
            size="sm"
            variant="secondary"
          >
            {t("clear")}
          </LoadingButton>
        </div>
      )}
    </div>
  );
};

export default DrawingToolbar;