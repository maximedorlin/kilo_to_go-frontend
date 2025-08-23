"use client";
import CancelButton from "@/components/ui/CancelButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-btn";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { ConsumablesInterface } from "@/interfaces/sanitary/consumables.interface";
import {
  useCreateConsumablesMutation,
  useUpdateConsumablesMutation,
} from "@/store/apis/sanitary/consumables.api";
import { useNavigateBack } from "@/lib/navigate-back";
import { ConsumableValidator } from "@/validators/administrator";

interface Props {
  initial?: ConsumablesInterface;
  refetchObject?: () => void;
}

const ConsumableForm: React.FC<Props> = ({ initial, refetchObject }) => {
  const { t } = useTranslation();
  const form = useForm<ConsumablesInterface>({
    resolver: zodResolver(ConsumableValidator),
    defaultValues: initial ? { ...initial } : {},
  });
  const navigateBack = useNavigateBack(initial ? 2 : 1);

  const [createConsumables, { isLoading: isLoadingCreate }] =
    useCreateConsumablesMutation();
  const [updateConsumables, { isLoading: isLoadingUpdate }] =
    useUpdateConsumablesMutation();

  const handleSubmit = async () => {
    const formValues = form.getValues();
    if (initial) {
      try {
        await updateConsumables({ id: initial.id, data: formValues }).unwrap();
        toast.success(t("consumable_updated_successfully"));
        if (refetchObject) {
          refetchObject();
        }
        navigateBack();
      } catch (error) {
        console.error(error);
        toast.error(t("an_error_occurred"));
      }
    } else {
      try {
        await createConsumables(formValues).unwrap();
        toast.success(t("consumable_added_successfully"));
        if (refetchObject) {
          refetchObject();
        }
        navigateBack();
      } catch (error) {
        console.error(error);
        toast.error(t("an_error_occurred"));
      }
    }
  };

  return (
    <div className="h-[calc(100vh-195px)] pb-1">
      <div className="bg-white h-full shadow-md rounded-md p-5 overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          {initial
            ? `${t("update_consumable")} ${initial.id.slice(0, 8)}`
            : t("add_consumable")}
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              handleSubmit();
            })}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              {/* Nom du matériel */}
              <FormField
                name="consumable_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required> {t("name")} </FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        placeholder={t("name")}
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type de  matérial */}
              <FormField
                name="consumable_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required> {t("type")} </FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        placeholder={t("type")}
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type de  matérial */}
              <FormField
                name="consumable_quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required> {t("quantity")} </FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        type="number"
                        placeholder={t("type")}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            form.setValue("consumable_quantity", 0);
                          } else if (!isNaN(Number(value))) {
                            form.setValue(
                              "consumable_quantity",
                              parseInt(value)
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end items-center gap-4">
              <CancelButton depth={initial ? 2 : 1} />
              <LoadingButton
                loading={isLoadingCreate || isLoadingUpdate}
                type="submit"
                variant={"destructive"}
                className="my-4"
              >
                {t("save")}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConsumableForm;
