// use-permission.tsx
import {
  AllPermissionsInterface,
  PermissionInterface,
} from "@/interfaces/auth/authinterfaces";

type UsePermission = (permissions: PermissionInterface[] | undefined) => {
  hasPermission: (permissionCodename: keyof AllPermissionsInterface) => boolean;
};

const usePermission: UsePermission = (permissions) => {
  const hasPermission = (
    permissionCodename: keyof AllPermissionsInterface
  ): boolean => {
    if (!permissions) return false;

    const permissionCodenames = new Set(permissions.map((p) => p.codename));

    return permissionCodenames.has(permissionCodename as string);
  };

  return { hasPermission };
};

export default usePermission;
