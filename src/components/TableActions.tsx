"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit2,
  Eye,
  MoreVertical,
  RotateCw,
  Trash,
  Trash2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Trans, useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "./ui/loading-btn";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { SetUnselectRows } from "@/store/slices/tables-pagiations-slices/geoSelectedIds.slice";
import { AllPermissionsInterface } from "@/interfaces/auth/authinterfaces";
import PermissionGuard from "@/lib/PermissionGuard";

interface TableActionProps {
  rowSelected: string[];
  singleDelete: {
    isLoading: boolean;
    handleDelete: () => void;
  };
  actionsClicked: () => void;
  setUpOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setDelOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  changePermission?: keyof AllPermissionsInterface;
  deletePermission?: keyof AllPermissionsInterface;
}

const TableActions: React.FC<TableActionProps> = ({
  rowSelected,
  actionsClicked,
  setUpOpen,
  setDelOpen,
  singleDelete,
  changePermission,
  deletePermission,
}) => {
  const [openDropdown, setDropdownOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const [openSingleDelete, setOpenSingleDelete] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const geoSelectedIds = useAppSelector(
    (state) => state.geoSelectedIds.geoSelectedIds
  );

  return (
    <div>
      <DropdownMenu
        open={openDropdown}
        onOpenChange={() => {
          setDropdownOpen(!openDropdown);
          if (geoSelectedIds.length > 0) return;
          actionsClicked();
        }}
        key={"action-button"}
      >
        <DropdownMenuTrigger className="flex justify-center items-center h-3">
          <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
          <MoreVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={``}>
          {rowSelected.length === 1 && (
            <>
              <DropdownMenuItem>
                <Link
                  href={`${pathname}/${rowSelected[0]}`}
                  className="flex gap-2 items-center"
                >
                  <Eye /> <Trans i18nKey={"details"} />
                </Link>
              </DropdownMenuItem>
              <PermissionGuard permission={changePermission || "add_clain"}>
                <DropdownMenuItem>
                  <Link
                    href={`${pathname}/${rowSelected[0]}/edit`}
                    className="flex gap-2 items-center"
                  >
                    <Edit2 /> <Trans i18nKey={"edit"} />
                  </Link>
                </DropdownMenuItem>
              </PermissionGuard>
              <PermissionGuard permission={deletePermission || "add_clain"}>
                <DropdownMenuItem
                  onClick={() => {
                    setDropdownOpen(false);
                    setOpenSingleDelete(true);
                  }}
                >
                  <Trash /> <Trans i18nKey={"delete"} />
                </DropdownMenuItem>
              </PermissionGuard>
            </>
          )}
          {setUpOpen && (
            <>
              <DropdownMenuSeparator />
              <PermissionGuard permission={changePermission || "add_clain"}>
                <DropdownMenuItem
                  className="ml-auto w-full flex cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                    setUpOpen(true);
                  }}
                >
                  <RotateCw />
                  {rowSelected.length > 1
                    ? t("change_multiple_state")
                    : t("change_state")}
                </DropdownMenuItem>
              </PermissionGuard>
            </>
          )}
          {setDelOpen && rowSelected.length > 1 && (
            <PermissionGuard permission={deletePermission || "add_clain"}>
              <DropdownMenuItem
                onClick={() => {
                  setDropdownOpen(false);
                  setDelOpen(true);
                }}
                className="ml-auto h-8 flex cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                {t("multiple_delete")}
              </DropdownMenuItem>
            </PermissionGuard>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openSingleDelete} onOpenChange={setOpenSingleDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("delete")}</DialogTitle>
            <DialogDescription>
              {t("do_you_really_want_to_delete")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpenSingleDelete(false)} variant={"link"}>
              {t("cancel")}
            </Button>
            <LoadingButton
              onClick={() => {
                dispatch(SetUnselectRows());
                singleDelete.handleDelete();
              }}
              loading={singleDelete.isLoading}
              variant={"destructive"}
            >
              {t("delete")}
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableActions;
