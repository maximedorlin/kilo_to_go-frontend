"use client";

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
import toast from "react-hot-toast";
import { GroupInterface } from "@/interfaces/auth/authinterfaces";
import {
  useDeleteGroupMutation,
  useGetGroupsQuery,
} from "@/store/apis/auth/groups.api";
import PermissionGuard from "@/lib/PermissionGuard";

// Actions pour chaque ligne
const GroupsCellAction: React.FC<GroupInterface> = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();

  const { refetch } = useGetGroupsQuery();

  const [deleteGroup, { isLoading }] = useDeleteGroupMutation();

  const handleDelete = async () => {
    try {
      await deleteGroup(props.id).unwrap();
      toast.success(t("group_deleted_successfully"));
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DropdownMenu>
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
          <PermissionGuard permission="change_group">
            <DropdownMenuItem>
              <Link
                href={`${pathname}/${props.id}/edit`}
                className="flex gap-2"
              >
                <Edit2 /> <Trans i18nKey="edit" />
              </Link>
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permission="delete_group">
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash /> <Trans i18nKey="delete" />
            </DropdownMenuItem>
          </PermissionGuard>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false}>
          <DialogTitle>{t("delete")}</DialogTitle>
          <p>{t("do_you_really_want_to_delete")} ?</p>
          <div className="flex justify-center gap-x-4">
            <Button onClick={() => setOpen(false)} variant="link">
              {t("cancel")}
            </Button>
            <LoadingButton
              onClick={handleDelete}
              loading={isLoading}
              variant="destructive"
            >
              {t("delete")}
            </LoadingButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Définitions des colonnes
export const GroupsColumns: ExtendedColumnDef<GroupInterface>[] = [
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
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="permission_number" />
    ),
    cell: ({ row }) => row.original.permissions.length + " permissions",
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <GroupsCellAction {...row.original} />,
  },
];
