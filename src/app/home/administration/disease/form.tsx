"use client";

import { useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Disease,
  PREDEFINED_CATEGORIES_FOR_CREATION,
} from "@/interfaces/administrative.interface";
import {
  useCreateDiseaseMutation,
  useUpdateDiseaseMutation,
} from "@/store/apis/administrative-deases.api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigateBack } from "@/lib/navigate-back";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { setTablePaginationState } from "@/store/slices/tables-pagiations-slices/all-table-slices";
import { useEffect, useState } from "react";
import React from "react";
import { DiseaseValidator } from "@/validators/administrator";
import CancelButton from "@/components/ui/CancelButton";
import { FaSave } from "react-icons/fa";
import { LoadingButton } from "@/components/ui/loading-btn";

const DiseaseForm = ({
  initial,
  refetchObject,
}: {
  initial?: Disease;
  refetchObject?: () => void;
}) => {
  const { t } = useTranslation();
  const navigateBack = useNavigateBack(1);
  const dispatch = useAppDispatch();
  const form = useForm<Disease>({
    resolver: zodResolver(DiseaseValidator),
    defaultValues: initial ? { ...initial } : {},
  });
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createDisease, { isLoading }] = useCreateDiseaseMutation();
  const [UpdateDisease, { isLoading: isLoadingUpdate }] =
    useUpdateDiseaseMutation();

  // const handleSubmit = async () => {
  //   const formValues = form.getValues();
  //   const createData : { ...formValues };

  const handleSubmit = async () => {
    const formValues = form.getValues();
    if (initial) {
      try {
        await UpdateDisease({
          data: formValues,
          id: initial.id,
        }).unwrap();
        toast.success(t("disease_updated_successfully"));
        if (refetchObject) {
          refetchObject();
        }
        navigateBack();
      } catch (error) {
        console.log("ERROR ", error);
        toast.error(t("an_error_occurred"));
      }
    } else {
      try {
        await createDisease(formValues).unwrap();
        toast.success(t("Disease_created_successfully"));
        navigateBack();
        if (refetchObject) {
          refetchObject();
        }
      } catch (error) {
        console.log(error);
        toast.error(t("an_error_occurred"));
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-195px)] gap-4 pb-3">
      <div
        className={`w-full h-full bg-white p-5 pt-1 overflow-hidden rounded-md shadow-lg  overflow-y-auto`}
      >
        <div className="py-5 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            {initial ? t("edit_disease") : t("add_disease")}
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => handleSubmit())}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="predefined_category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>{t("predefined_category")}</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("select_type")} />
                          </SelectTrigger>
                          <SelectContent>
                            {PREDEFINED_CATEGORIES_FOR_CREATION.map(
                              (opt, idx) => (
                                <SelectItem key={idx} value={opt.id}>
                                  {t(opt.libelle)}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="disease_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("disease_name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("disease_name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="disease_symptoms"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("disease_symptoms")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("disease_symptoms")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="transmissible"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value || false}
                          onChange={(e) => field.onChange(e.target.checked)}
                          id="transmissible-checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="transmissible-checkbox"
                        className="mb-0"
                      >
                        {t("transmissible")}
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="custom_category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("custom_category")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("custom_category")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col mt-2"></div>
              <div className="flex justify-end gap-2 items-center">
                <CancelButton depth={1} />

                <LoadingButton
                  type="submit"
                  loading={isLoading || isLoadingUpdate}
                  className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <FaSave />
                  {t("save")}
                </LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DiseaseForm;
