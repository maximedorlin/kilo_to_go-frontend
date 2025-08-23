"use client";
import { DataTableColumnHeader } from "@/components/tasks/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  statut: "actif" | "inactif" | "suspendu";
}

export const userscolumns: ColumnDef<Utilisateur>[] = [
  {
    id: "select",

    header: ({ table }) => (
      <Checkbox
        variant="destructive"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] rounded-md border-destructive"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        variant="destructive"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] rounded-md border-destructive"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
  },

  {
    accessorKey: "nom",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NAME" />
    ),
  },

  {
    accessorKey: "telephone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TELEPHONE" />
    ),
  },

  {
    accessorKey: "statut",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Statut" />
    ),
  },
];
