// components/UrlGuard.tsx
"use client";
import React from "react";
import usePermission from "../hooks/use-permissions";
import { useAppSelector } from "@/hooks/redux-toolkit";
import { AllPermissionsInterface } from "@/interfaces/auth/authinterfaces";
import { Oops } from "@/components/dashboard/ErrorComponent";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
interface UrlGuardProps {
  permission: keyof AllPermissionsInterface;
  children: React.ReactNode;
}

const UrlGuard: React.FC<UrlGuardProps> = ({ permission, children }) => {
  const { t } = useTranslation();
  const user_group = useAppSelector((state) => state.auth.user.group);

  const permissions =
    typeof user_group === "string" ? undefined : user_group?.permissions;

  const { hasPermission } = usePermission(permissions);

  if (!hasPermission(permission)) {
    return (
      <div className="w-full h-full flex-col justify-center items-center pt-20">
        <div className="flex justify-center items-center flex-col">
          <Image
            alt="unauthorized"
            className="aspect-square"
            src={IMAGES.undraw_unauthorized}
            width={300}
          />
          <Oops />
        </div>
        <p className="text-center">{t("unauthorized_page")}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default UrlGuard;
