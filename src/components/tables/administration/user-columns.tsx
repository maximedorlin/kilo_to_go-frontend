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
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/store/apis/auth/authentication.api";
import { useAppSelector } from "@/hooks/redux-toolkit";
import {
  GroupInterface,
  UserInterface,
} from "@/interfaces/auth/authinterfaces";
import PermissionGuard from "@/lib/PermissionGuard";

// Actions pour chaque ligne
const UsersCellAction: React.FC<UserInterface> = (props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const pagination = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const { refetch } = useGetUsersQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(props.id).unwrap();
      toast.success(t("user_deleted_successfully"));
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

          <PermissionGuard permission="change_user">
            <DropdownMenuItem>
              <Link
                href={`${pathname}/${props.id}/edit`}
                className="flex gap-2"
              >
                <Edit2 /> <Trans i18nKey="edit" />
              </Link>
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permission="delete_user">
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
export const UsersColumns = (
  groupData?: GroupInterface[]
): ExtendedColumnDef<UserInterface>[] => [
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
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="last_name" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="phone_number" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="groups" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {(() => {
          if (!groupData) return null;

          const grp = groupData.find((g) => g.id === row.original.group);
          if (!grp) return null;

          return (
            <Badge key={grp.id} variant="outline">
              {grp.name}
            </Badge>
          );
        })()}
      </div>
    ),
    enableSorting: false,
  },
  // {
  //   accessorKey: "is_blocked",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="is_blocked" />
  //   ),
  //   cell: ({ row }) => (
  //     <Badge variant={row.original.is_blocked ? "destructive" : "default"}>
  //       <Trans i18nKey={row.original.is_blocked ? "yes" : "no"} />
  //     </Badge>
  //   ),
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UsersCellAction {...row.original} />,
  },
];
