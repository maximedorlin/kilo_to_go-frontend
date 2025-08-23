import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  BarChartBig,
  FileBadge,
  Folder,
  HandCoins,
  Landmark,
  LucideLayoutDashboard,
  Map,
  Search,
  Wallet,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const quickActions = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LucideLayoutDashboard size={18} />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analitics",
    icon: <BarChartBig size={18} />,
  },
  {
    title: "Administration",
    href: "/dashboard/administration",
    icon: <Folder size={18} />,
  },
  { title: "Carte", href: "/dashboard/carte", icon: <Map size={18} /> },
  {
    title: "Patrimoine",
    href: "/dashboard/patrimoine",
    icon: <Landmark size={18} />,
  },
  {
    title: "Contrats",
    href: "/dashboard/contracts",
    icon: <FileBadge size={18} />,
  },
  {
    title: "Recettes",
    href: "/dashboard/recette",
    icon: <HandCoins size={18} />,
  },
  { title: "Finance", href: "/dashboard/payments", icon: <Wallet size={18} /> },
];

export default function QuickCommand() {
  const [search, setSearch] = useState("");
  const filteredActions = quickActions.filter((action) =>
    action.title.toLowerCase().includes(search.toLowerCase())
  );
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-xl h-12 bg-[#EBEBEB] xl:w-1/4 flex items-center px-5 cursor-pointer">
          <Search />
          <span className="ml-3 text-gray-500"> {t("search")} </span>
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-lg w-full bg-white rounded-lg shadow-lg p-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("quick_access")}</h2>
          <DialogClose asChild>
            <button>
              <X size={20} className="text-gray-500" />
            </button>
          </DialogClose>
        </div>

        <Input
          autoFocus
          type="text"
          placeholder="Search for actions..."
          className="mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-3 space-y-2">
          {filteredActions.length > 0 ? (
            filteredActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                {action.icon}
                <span className="ml-3">{t(action.title)}</span>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 text-center">No results found</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
