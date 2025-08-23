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
import { Personnel } from "@/interfaces/administrative.interface";
import {} from "@/store/apis/participants.api";
import {
  useDeletePersonnelMutation,
  useGetPersonnelQuery,
} from "@/store/apis/administrative-personnel.api";
import PermissionGuard from "@/lib/PermissionGuard";

// Composant d'actions pour chaque ligne
const PersonnelCellAction: React.FC<Personnel> = (props) => {
  const [open, setOpen] = useState(false);
  const [openDropdown, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [deletePersonnel, { isLoading }] = useDeletePersonnelMutation();
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

  const { refetch } = useGetPersonnelQuery({
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
      await deletePersonnel(props.id).unwrap();
      toast.success(t("personnel_deleted_successfully"));
      refetch();
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
          <DropdownMenuItem>
            <Link
              href={`${pathname}/${props.id}`}
              className="flex gap-2 items-center"
            >
              <Eye /> <Trans i18nKey={"details"} />
            </Link>
          </DropdownMenuItem>
          <PermissionGuard permission="change_personnel">
            <DropdownMenuItem>
              <Link
                href={`${pathname}/${props.id}/edit`}
                className="flex gap-2"
              >
                <Edit2 /> <Trans i18nKey="edit" />
              </Link>
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permission="delete_personnel">
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash /> <Trans i18nKey="delete" />
            </DropdownMenuItem>
          </PermissionGuard>
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
export const PersonnelColumns: ExtendedColumnDef<Personnel>[] = [
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
    accessorKey: "personnel_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="personnel_type" />
    ),
    enableSorting: true,
    cell: ({ row }) => <Trans i18nKey={row.original.personnel_type} />,
  },
  {
    accessorKey: " personnel_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=" personnel_description" />
    ),
    enableSorting: true,
    cell: ({ row }) => <Trans i18nKey={row.original.personnel_description} />,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <PersonnelCellAction {...row.original} />,
  },
];
