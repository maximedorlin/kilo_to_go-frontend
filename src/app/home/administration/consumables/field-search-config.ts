import { FieldConfig } from "@/components/SearchFilterComponent";
import { ConsumablesInterface } from "@/interfaces/sanitary/consumables.interface";
import { i18n } from "@/lib/i18n";

export const consumableFieldConfig: Partial<
  Record<
    keyof Partial<ConsumablesInterface>,
    FieldConfig<Partial<ConsumablesInterface>>
  >
> = {
  consumable_name: {
    type: "string",
    label: i18n.t("equipment_name"),
  },
  consumable_type: {
    type: "string",
    label: i18n.t("type"),
  },
  consumable_quantity: {
    type: "number",
    label: i18n.t("quantity"),
  },
};

export const emptyModel: Partial<ConsumablesInterface> = {
  consumable_name: "",
  consumable_type: "",
  consumable_quantity: 0,
};
