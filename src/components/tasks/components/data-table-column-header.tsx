import { Column } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  // ArrowDownIcon, ArrowUpIcon,
  EyeIcon,
} from "lucide-react";
// import { BiSort } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation();
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{t(title)}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent font-semibold"
          >
            <span>{t(title)}</span>
            {/* {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <BiSort className="ml-2 h-4 w-4" />
            )} */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {/* <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t("asc")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t("desc")}
          </DropdownMenuItem>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            {t("hide")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
