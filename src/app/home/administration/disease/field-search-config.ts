import { FieldConfig } from "@/components/SearchFilterComponent";
import { Disease } from "@/interfaces/administrative.interface";
import { i18n } from "@/lib/i18n";

export const searchConfig: Partial<
  Record<keyof Partial<Disease>, FieldConfig<Partial<Disease>>>
> = {
  disease_name: {
    type: "string",
    label: i18n.t("disease_name"),
  },

  predefined_category: {
    type: "select",
    label: i18n.t("predefined_category"),
    options: [
      {
        value: "environnementale",
        label: "Maladies environnementales / professionnelles",
      },

      {
        value: "degenerative",
        label: "Maladies dégénératives",
      },

      {
        value: "infectieuse",
        label: "Maladies infectieuses",
      },

      {
        value: "metabolique",
        label: "Maladies métaboliques",
      },

      {
        value: "auto_immune",
        label: "Maladies auto-immunes",
      },

      {
        value: "genetique",
        label: "Maladies génétiques",
      },
    ],
  },
};

export const emptyModel: Partial<Disease> = {
  disease_name: "",
  predefined_category: "",
};
