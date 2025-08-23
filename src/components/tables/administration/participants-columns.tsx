import React, { useEffect, useState } from "react";
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
// import { toast } from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/loading-btn";
import { ExtendedColumnDef } from "@/components/tasks/components/data-table";
import { DataTableColumnHeader } from "@/components/tasks/components/data-table-column-header";
// import { formatDate } from "@/utils/dateFormat";
import toast from "react-hot-toast";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { ParticipantsInterface } from "@/interfaces/administrative.interface";
import {
  useDeleteParticipantsMutation,
  useGetParticipantsQuery,
} from "@/store/apis/participants.api";
import PermissionGuard from "@/lib/PermissionGuard";

// Composant d'actions pour chaque ligne
const ParticipantsCellAction: React.FC<ParticipantsInterface> = (props) => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [deleteParticipant, { isLoading }] = useDeleteParticipantsMutation();
  // const storedPagination = useAppSelector((state) => state.geoTable);

  const observationsheetTable = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const [pagination] = React.useState<PaginationState>({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
  });

  const [sorting] = React.useState<SortingState>(observationsheetTable.sorting);

  const [columnFilters] = useState<ColumnFiltersState>([]);

  const { refetch } = useGetParticipantsQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
    sorting: observationsheetTable.sorting,
    filters: observationsheetTable.filters.map((f) => ({
      id: f.id,
      value: f.value,
    })),
  });

  useEffect(() => {
    dispatch(
      setTablePaginationState({
        key: "observationsheetTable",
        realPayload: {
          filters: columnFilters,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sorting,
        },
      })
    );
  }, [sorting, columnFilters, pagination, dispatch]);

  const handleDelete = async () => {
    try {
      await deleteParticipant(props.id).unwrap();
      toast.success(t("participants_deleted_successfully"));
      await refetch();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t("you_cannot_delete"));
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
          <PermissionGuard permission="change_participant">
            <DropdownMenuItem>
              <Link
                href={`${pathname}/${props.id}`}
                className="flex gap-2 items-center"
              >
                <Eye /> <Trans i18nKey={"details"} />
              </Link>
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permission="delete_participant">
            <DropdownMenuItem>
              <Link
                href={`${pathname}/${props.id}/edit`}
                className="flex gap-2"
              >
                <Edit2 /> <Trans i18nKey="edit" />
              </Link>
            </DropdownMenuItem>
          </PermissionGuard>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash /> <Trans i18nKey="delete" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
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

// Définition des colonnes
export const ParticipantsColumns: ExtendedColumnDef<ParticipantsInterface>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nom_complet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="nom_complet" />
    ),
    enableSorting: true,
    cell: ({ row }) => <Trans i18nKey={row.original.nom_complet} />,
  },
  // {
  //   accessorKey: "subcontractor",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="subcontractor" />
  //   ),
  //   enableSorting: true,
  //   cell: ({ row }) => row.original.subcontractor,
  // },
  //   {
  //     accessorKey: "end_date",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="end_date" />
  //     ),
  //     enableSorting: true,
  //     cell: ({ row }) => formatDate(row.original.end_date),
  //   },
  {
    accessorKey: "profil",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="profil" />
    ),
    enableSorting: true,
    cell: ({ row }) => <Trans i18nKey={row.original.profil} />,
  },
  {
    accessorKey: "type_participant",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="type_participant" />
    ),
    enableSorting: true,
    cell: ({ row }) => <Trans i18nKey={row.original.type_participant} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="email" />
    ),
    enableSorting: true,
    cell: ({ row }) => <Trans i18nKey={row.original.email} />,
  },
  {
    accessorKey: "telephone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="telephone" />
    ),
    enableSorting: true,
    cell: ({ row }) => <Trans i18nKey={row.original.telephone} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ParticipantsCellAction {...row.original} />,
  },
];
