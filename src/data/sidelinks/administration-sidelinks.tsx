import {
  Bandage,
  GraduationCap,
  Group,
  Hospital,
  Slack,
  User2Icon,
  UserCog,
  Users2,
} from "lucide-react";
import { SideLink } from "../sideTypes";

export const administration_sidelinks: SideLink[] = [
  {
    title: "accounts",
    label: "",
    href: "/home/administration/accounts",
    icon: <UserCog size={22} />,
    permissions: ["view_user", "view_group"],
    sub: [
      {
        title: "users",
        href: "/home/administration/accounts/users",
        icon: <User2Icon size={18} />,
        permissions: ["view_user"],
      },
      {
        title: "groups",
        href: "/home/administration/accounts/groups",
        icon: <Group size={18} />,
        permissions: ["view_group"],
      },
    ],
  },
  {
    title: "equipments",
    label: "",
    href: "/home/administration/equipments",
    icon: <Slack size={22} />,
    permissions: ["view_equipment"],
  },
  {
    title: "disease",
    label: "",
    href: "/home/administration/disease",
    icon: <Hospital size={22} />,
    permissions: ["view_disease"],
  },
  {
    title: "consumables",
    label: "",
    href: "/home/administration/consumables",
    icon: <Bandage size={22} />,
    permissions: ["view_consumable"],
  },
  {
    title: "participants",
    label: "",
    href: "/home/administration/participants",
    icon: <Users2 size={22} />,
    permissions: ["view_participant"],
  },
  {
    title: "personnel",
    label: "",
    href: "/home/administration/personnel",
    icon: <GraduationCap size={22} />,
    permissions: ["view_personnel"],
  },
];
