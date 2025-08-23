import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { format, parseISO, isBefore } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
// import type { UseFormReturn, FieldValues } from "react-hook-form";
import type { CalendarProps } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

type CommonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
};

type SinglePickerProps = {
  mode?: "single";
  field: {
    value?: string;
    onChange: (value: string) => void;
  };
  endDateFieldName?: string;
} & Omit<CalendarProps, "mode" | "selected" | "onSelect" | "locale">;

type RangePickerProps = {
  mode: "range";
  field: {
    value?: DateRange;
    onChange: (value: DateRange) => void;
  };
} & Omit<CalendarProps, "mode" | "selected" | "onSelect" | "locale">;

type DatePickerFieldProps = CommonProps &
  (SinglePickerProps | RangePickerProps);

export default function DatePickerField(props: DatePickerFieldProps) {
  const { i18n, t } = useTranslation();
  const locale = i18n.language === "fr" ? fr : enUS;

  if (props.mode === "range") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { field, form, ...calendarProps } = props;

    return (
      <FormControl className="">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal w-full",
                !field.value?.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value?.from
                ? `${format(field.value.from, "PPP", { locale })}${
                    field.value.to
                      ? ` → ${format(field.value.to, "PPP", { locale })}`
                      : ""
                  }`
                : t("pick a date")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              locale={locale}
              selected={field.value}
              onSelect={(range) => range && field.onChange(range)}
              initialFocus
              {...calendarProps}
              mode="range"
            />
          </PopoverContent>
        </Popover>
      </FormControl>
    );
  }

  // mode === 'single' (ou non spécifié)
  const {
    field,
    form,
    endDateFieldName = "end_date",
    ...calendarProps
  } = props;

  return (
    <FormControl className="flex-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full",
              !field.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value
              ? format(parseISO(field.value), "PPP", { locale })
              : t("pick a date")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            locale={locale}
            selected={field.value ? parseISO(field.value) : undefined}
            onSelect={(date) => {
              if (!date) return;
              const formatted = format(date, "yyyy-MM-dd");
              field.onChange(formatted);

              const endDate = form.getValues(endDateFieldName);
              if (endDate && isBefore(endDate, date)) {
                form.resetField(endDateFieldName);
              }
            }}
            initialFocus
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </FormControl>
  );
}
