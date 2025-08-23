"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/redux-toolkit";
import { setIsHomeTrue } from "@/store/slices/homePageSlice";
import { IMAGES } from "@/constants/images";
import Image from "next/image";

const MainDash: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const modules = [
    // { title: t("urban"), icon: IMAGES.city, path: "/urban-planning" },
    // { title: t("roads"), icon: IMAGES.road, path: "/road" },
    // { title: t("waste"), icon: IMAGES.recycle, path: "/waste-collection" },
    // {
    //   title: t("public_lighting"),
    //   icon: IMAGES.lighting,
    //   path: "/public-lighting",
    // },
    // { title: t("sanitary"), icon: IMAGES.health, path: "/sanitary" },
    {
      title: t("administration"),
      icon: IMAGES.admin,
      path: "/administration/accounts/users",
    },
  ];

  useEffect(() => {
    dispatch(setIsHomeTrue());
  }, [dispatch]);

  return (
    // <AuthProvider>
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 bg-[url('/images/dla_city.jpg')] bg-cover bg-center blur-sm opacity-80 z-0"></div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full p-4 gap-7 py-10 md:px-20 overflow-y-auto">
        {/* Titre */}
        {/* Grille des modules */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {modules.map((module, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md p-8 flex flex-col justify-between cursor-pointer hover:scale-105 transition bg-gradient-to-b from-white/80 to-white/50 min-h-[220px]"
              onClick={() => router.push(`${pathname}${module.path}`)}
            >
              <div className="flex justify-center items-center mb-6">
                <Image
                  src={module.icon.src}
                  alt={module.title}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-center text-xl font-bold text-slate-800">
                {module.title}
              </h3>
              <div className="flex justify-end mt-6">
                <div className="bg-orange-500 w-7 h-7 flex items-center justify-center rounded-sm">
                  <span className="text-white text-sm">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // </AuthProvider>
  );
};

export default MainDash;
