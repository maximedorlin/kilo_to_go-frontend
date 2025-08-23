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
import { Textarea } from "@/components/ui/textarea";
import { EquipementInterface } from "@/interfaces/sanitary/equipement.interface";
import { useNavigateBack } from "@/lib/navigate-back";
import {
  useCreateEquipementMutation,
  useUpdateEquipementMutation,
} from "@/store/apis/sanitary/equipement.api";
import { EquipmentValidator } from "@/validators/administrator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface Props {
  initial?: EquipementInterface;
  refetchObject?: () => void;
}

const EquipmentForm: React.FC<Props> = ({ initial, refetchObject }) => {
  const { t } = useTranslation();
  const form = useForm<EquipementInterface>({
    resolver: zodResolver(EquipmentValidator),
    defaultValues: initial ? { ...initial } : {},
  });
  const navigateBack = useNavigateBack(initial ? 2 : 1);

  const [createEquipement, { isLoading: isLoadingCreate }] =
    useCreateEquipementMutation();
  const [updateEquipement, { isLoading: isLoadingUpdate }] =
    useUpdateEquipementMutation();

  const handleSubmit = async () => {
    const formValues = form.getValues();
    if (initial) {
      try {
        await updateEquipement({ id: initial.id, data: formValues }).unwrap();
        toast.success(t("equipment_updated_successfully"));
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
        await createEquipement(formValues).unwrap();
        toast.success(t("equipment_created_successfully"));
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
            ? `${t("update_equipment")} ${initial.id.slice(0, 8)}`
            : t("add_equipment")}
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              handleSubmit();
            })}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              {/* Nom de l'équipement */}
              <FormField
                name="equipment_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required> {t("equipment_name")} </FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        placeholder={t("equipment_name")}
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type d'équipement */}
              <FormField
                name="equipment_type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {t("type")} </FormLabel>
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              {/* Quantité */}
              <FormField
                name="equipment_quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required> {t("quantity")} </FormLabel>
                    <FormControl className="flex-1">
                      <Input
                        type="number"
                        placeholder={t("quantity")}
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            form.setValue("equipment_quantity", 0);
                          } else if (!isNaN(Number(value))) {
                            form.setValue(
                              "equipment_quantity",
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

              {/* Description */}
              <FormField
                name="equipment_description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {t("description")} </FormLabel>
                    <FormControl className="flex-1">
                      <Textarea
                        {...field}
                        placeholder={t("description")}
                        value={field.value || ""}
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

export default EquipmentForm;
