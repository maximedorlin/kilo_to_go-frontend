import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation, Trans } from "react-i18next";
import { MoreHorizontal, Eye, Trash, Edit2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/loading-btn";
import type { ExtendedColumnDef } from "@/components/tasks/components/data-table";
import { DataTableColumnHeader } from "@/components/tasks/components/data-table-column-header";
import { EquipementInterface } from "@/interfaces/sanitary/equipement.interface";
import { formatDate } from "@/utils/dateFormat";
import { i18n } from "@/lib/i18n";
import { useDeleteEquipementMutation } from "@/store/apis/sanitary/equipement.api";
import toast from "react-hot-toast";
import { useGetAllEquipmentsQuery } from "@/store/apis/sanitary/equipment_no_page";
import PermissionGuard from "@/lib/PermissionGuard";

// Actions pour chaque ligne
const EquipementsCellAction: React.FC<EquipementInterface> = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const [openDropdown, setDropdownOpen] = useState<boolean>(false);
  const [deleteEquipement] = useDeleteEquipementMutation();
  const { refetch } = useGetAllEquipmentsQuery();

  const handleDelete = async () => {
    try {
      await deleteEquipement(props.id).unwrap();
      toast.success(t("equipment_deleted_successfully"));
      await refetch();
      setOpen(false);
    } catch (error) {
      toast(t("an_error_occurred"));
      console.error(error);
    }
  };

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`${pathname}/${props.id}`}
              className="flex gap-2 items-center"
            >
              <Eye /> <Trans i18nKey={"details"} />
            </Link>
          </DropdownMenuItem>
          <PermissionGuard permission="change_equipment">
            <DropdownMenuItem>
              <Link
                href={`${pathname}/${props.id}/edit`}
                className="flex gap-2"
              >
                <Edit2 /> <Trans i18nKey="edit" />
              </Link>
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permission="delete_equipment">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setDropdownOpen(false);
                setOpen(true);
              }}
            >
              <Trash /> <Trans i18nKey="delete" />
            </DropdownMenuItem>
          </PermissionGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false}>
          <DialogTitle>{t("delete")}</DialogTitle>
          <p>{t("do_you_really_want_to_delete")}</p>
          <div className="flex justify-center gap-x-4">
            <Button onClick={() => setOpen(false)} variant="link">
              {t("cancel")}
            </Button>
            <LoadingButton onClick={handleDelete} variant="destructive">
              {t("delete")}
            </LoadingButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Définitions des colonnes
export const EquipmentsColumns: ExtendedColumnDef<EquipementInterface>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        value={row.original.id}
        aria-label="Select row"
        className="translate-y-[2px] rounded-md data-[state=checked]:bg-blue-900 data-[state=checked]:border-blue-900"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="code" />
    ),
    cell: ({ row }) => row.original.code,
  },
  {
    accessorKey: "equipment_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="equipment_name" />
    ),
    cell: ({ row }) => row.original.equipment_name,
  },
  {
    accessorKey: "equipment_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="equipment_description" />
    ),
    cell: ({ row }) => row.original.equipment_description,
  },
  {
    accessorKey: "equipment_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="type" />
    ),
    cell: ({ row }) => row.original.equipment_type,
  },
  {
    accessorKey: "equipment_quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="quantity" />
    ),
    cell: ({ row }) => row.original.equipment_quantity,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="created_at" />
    ),
    cell: ({ row }) =>
      row.original.created_at &&
      formatDate(row.original.created_at, i18n.language),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <EquipementsCellAction {...row.original} />,
  },
];
