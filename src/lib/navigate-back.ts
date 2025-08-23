"use client";

import { BreadcrumbConfig } from "@/data/breakcrumbdatas";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useNavigateBack = (
  p0: number,
  breadcrumbData?: BreadcrumbConfig
) => {
  const router = useRouter();
  console.log(breadcrumbData);

  return useCallback(
    (levels: number = p0) => {
      try {
        // Essayer d'abord avec le router Next.js
        if (levels === 1) {
          return router.back();
        }

        const pathSegments = window.location.pathname
          .split("/")
          .filter(Boolean);
        if (pathSegments.length >= levels) {
          const newPath = `/${pathSegments.slice(0, -levels).join("/")}`;
          router.push(newPath);
        } else {
          router.push("/home");
        }
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback vers window.history
        window.history.go(-levels);
      }
    },
    [p0, router]
  );
};
