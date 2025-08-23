import React from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, Path, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Option {
  id: string | number;
  libelle: string;
}

interface ComboboxFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>; // Remplacement de `control` par `form`
  name: Path<T>;
  options: Option[];
  label: string;
  placeholder?: string;
  idType?: "string" | "number"; // Type d'identifiant
  disabled?: boolean; // Permet de désactiver le champ
  required?: boolean;
}

const ComboboxField = <T extends FieldValues>({
  form,
  name,
  options,
  label,
  placeholder,

  idType = "string", // Par défaut, on considère que c'est une chaîne
  ...rest
}: ComboboxFieldProps<T>) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { t } = useTranslation();
  return (
    <FormField
      control={form.control} // Utilisation de `form.control`
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel required={rest.required || false}>{label}</FormLabel>
          <FormControl className="flex-1 w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={rest.disabled || false}
                  variant="outline"
                  role="combobox"
                  aria-expanded={Boolean(field.value)}
                  className="w-full justify-between overflow-hidden"
                >
                  {field.value && options
                    ? options.find((c) => c.id === field.value)?.libelle
                    : placeholder || t("select_an_option")}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-full">
                <Command>
                  <CommandInput
                    placeholder={t("search_placeholder")}
                    value={searchTerm}
                    onValueChange={(value) => setSearchTerm(value)}
                  />
                  <CommandList>
                    <CommandEmpty> {t("no_resuls")} </CommandEmpty>
                    <CommandGroup>
                      {options.map((c) => (
                        <CommandItem
                          key={c.id}
                          // value={c.libelle} // Utilisation de libelle pour l'affichage
                          onSelect={() => {
                            const newValue =
                              idType == "number" ? Number(c.id) : String(c.id); // Conversion basée sur idType
                            field.onChange(newValue); // Mise à jour de la valeur
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${field.value ===
                                (idType === "number"
                                  ? Number(c.id)
                                  : String(c.id))
                                ? "opacity-100"
                                : "opacity-0"
                              }`}
                          />
                          {c.libelle}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComboboxField;
