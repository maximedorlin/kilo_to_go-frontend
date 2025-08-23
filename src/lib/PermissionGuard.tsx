// components/PermissionGuard.tsx
import React from "react";
import usePermission from "../hooks/use-permissions";
import { useAppSelector } from "@/hooks/redux-toolkit";
import { AllPermissionsInterface } from "@/interfaces/auth/authinterfaces";

interface PermissionGuardProps {
  permission: keyof AllPermissionsInterface;
  children: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
}) => {
  const user_group = useAppSelector((state) => state.auth.user.group);

  const permissions =
    typeof user_group === "string" ? undefined : user_group?.permissions;

  const { hasPermission } = usePermission(permissions);

  if (!hasPermission(permission)) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionGuard;
