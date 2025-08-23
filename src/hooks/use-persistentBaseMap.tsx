"use client";
import { useEffect, useState } from "react";

const usePersistentBaseMap = (initialBaseMap: string) => {
  const [currentBaseMap, setCurrentBaseMap] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentBaseMap");
      return stored ?? initialBaseMap;
    }
    return initialBaseMap;
  });

  useEffect(() => {
    localStorage.setItem("currentBaseMap", currentBaseMap);
  }, [currentBaseMap]);

  return [currentBaseMap, setCurrentBaseMap] as const;
};

export default usePersistentBaseMap;
