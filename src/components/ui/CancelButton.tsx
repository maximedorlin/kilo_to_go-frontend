/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdCancel } from "react-icons/md";
import { ArrowLeft } from "lucide-react";
import { useNavigateBack } from "@/lib/navigate-back";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import {
  clearGeoJSON,
  setGeomType,
  setIsInitial,
} from "@/store/slices/form-map/mapSlice";
import { BreadcrumbConfig } from "@/data/breakcrumbdatas";

interface CancelButtonProps {
  message?: string;
  depth: number;
  breadcrumbData?: BreadcrumbConfig;
}
const CancelButton: React.FC<CancelButtonProps> = ({
  message,
  depth,
  breadcrumbData,
}) => {
  const { t } = useTranslation();
  const NavigateBack = breadcrumbData
    ? useNavigateBack(depth, breadcrumbData)
    : useNavigateBack(depth);
  const dispatch = useAppDispatch();

  const clicked = () => {
    dispatch(setGeomType(null));
    dispatch(clearGeoJSON());
    dispatch(setIsInitial(false));
    NavigateBack();
  };
  return (
    <div
      className="my-4 cursor-pointer bg-accent rounded-sm"
      onClick={() => clicked()}
    >
      <div className="border border-slate-200 rounded p-[8px] px-4 flex items-center gap-x-3">
        {message ? (
          <>
            <ArrowLeft /> {message}
          </>
        ) : (
          <>
            <MdCancel /> {t("cancel")}
          </>
        )}
      </div>
    </div>
  );
};

export default CancelButton;
