import { FieldConfig } from "@/components/SearchFilterComponent";
import { EquipementInterface } from "@/interfaces/sanitary/equipement.interface";
import { i18n } from "@/lib/i18n";

export const equipmentFieldConfig: Partial<
  Record<
    keyof Partial<EquipementInterface>,
    FieldConfig<Partial<EquipementInterface>>
  >
> = {
  code: {
    type: "string",
    label: i18n.t("code"),
  },
  equipment_name: {
    type: "string",
    label: i18n.t("equipment_name"),
  },
  equipment_type: {
    type: "string",
    label: i18n.t("type"),
  },
  equipment_quantity: {
    type: "number",
    label: i18n.t("quantity"),
  },
};

export const emptyModel: Partial<EquipementInterface> = {
  code: "",
  equipment_name: "",
  equipment_type: "",
  equipment_quantity: 0,
};
