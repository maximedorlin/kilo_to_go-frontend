"use client";

import { usePathname } from "next/navigation";

export default function useCheckActiveNav() {
  const pathname = usePathname();

  const checkActiveNav = (nav: string): boolean => {
    // Normaliser les chemins en supprimant les barres obliques finales
    const normalizedPathname = pathname.replace(/\/+$/, "");
    const normalizedNav = nav.replace(/\/+$/, "");

    const pathParts = normalizedPathname.split("/");
    const navParts = normalizedNav.split("/");

    if (nav == "/dashboard") {
      if (pathname == "/dashboard") return true;
      else return false;
    }
    if (navParts.length > pathParts.length && pathname.split("/").length < 2) {
      // Vérifier si le nav a plus de segments que le path
      return false; // Si le nav a plus de segments, c'est faux
    }

    // Rassembler les segments du pathname jusqu'à la longueur du nav
    const gatheredPath = pathParts.slice(0, navParts.length).join("/");

    // Comparer le chemin rassemblé avec le nav normalisé
    return gatheredPath === normalizedNav;
  };

  return { checkActiveNav };
}
