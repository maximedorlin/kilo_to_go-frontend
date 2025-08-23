import { AllPermissionsInterface } from "@/interfaces/auth/authinterfaces";
import type { JSX } from "react";
export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
  permissions?: {
    [K in keyof AllPermissionsInterface]: K extends `view_${string}`
      ? K
      : never;
  }[keyof AllPermissionsInterface][];
  lastElement?: boolean;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}
