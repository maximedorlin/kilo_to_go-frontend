import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingButton } from "@/components/ui/loading-btn";
import { useAppSelector } from "@/hooks/redux-toolkit";
import { Button } from "@/components/ui/button";
import {
  useDeleteDiseaseMutation,
  useGetDiseaseQuery,
} from "@/store/apis/administrative-deases.api";

import { ColumnDef } from "@tanstack/react-table";
import { Edit2, Eye, MoreHorizontal, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trans, useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import PermissionGuard from "@/lib/PermissionGuard";

interface Disease {
  id: string;
  disease_name: string;
  disease_symptoms: string;
  transmissible: boolean;
  predefined_category: string;
}

const DiseaseCellAction: React.FC<Disease> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDropdown, setDropdownOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const [deleteDisease, { isLoading }] = useDeleteDiseaseMutation();
  const observationsheetTable = useAppSelector(
    (state) => state.AllTableSlice["observationsheetTable"]
  );

  const { refetch } = useGetDiseaseQuery({
    pageIndex: observationsheetTable.pageIndex,
    pageSize: observationsheetTable.pageSize,
    sorting: observationsheetTable.sorting,
    filters: observationsheetTable.filters.map((f) => ({
      id: f.id,
      value: f.value,
    })),
  });
  const handleDelete = async () => {
    try {
      await deleteDisease(props.id).unwrap();
      toast.success(t("disease_deleted_successfully"));
      refetch();
      setOpen(false);
    } catch (error) {
      toast.error(t("you_can_delete"));
      console.log(error);
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
              <Eye />
              <Trans i18nKey={"details"} />
            </Link>
          </DropdownMenuItem>
          <PermissionGuard permission="change_disease">
            <DropdownMenuItem>
              <Link
                href={`${pathname}/${props.id}/edit`}
                className="flex gap-2"
              >
                <Edit2 /> <Trans i18nKey="edit" />
              </Link>
            </DropdownMenuItem>
          </PermissionGuard>
          <PermissionGuard permission="delete_disease">
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

export const DiseaseColumns: ColumnDef<Disease>[] = [
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
    accessorKey: "disease_name",
    header: "Nom de la maladie",
  },
  {
    accessorKey: "disease_symptoms",
    header: "Symptômes",
    cell: ({ row }) => (
      <div className="line-clamp-2 text-sm text-muted-foreground">
        {row.original.disease_symptoms}
      </div>
    ),
  },
  {
    accessorKey: "transmissible",
    header: "Transmissible",
    cell: ({ row }) => (row.original.transmissible ? "Oui" : "Non"),
  },
  {
    accessorKey: "predefined_category",
    header: "Catégorie pré-définie",
    cell: ({ row }) => <Trans i18nKey={row.original.predefined_category} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DiseaseCellAction {...row.original} />,
  },
];
