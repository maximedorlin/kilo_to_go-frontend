"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterComponentProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  value,
  setValue,
}) => {
  const { t } = useTranslation();
  const [zone, setZone] = useState<"commune" | "quarter">("commune");
  const options = zone === "commune"
  ? [{ value: "h", label: "yde1" }]
  : [{ value: "m", label: "yde2" }];
  return (
    <div className="mt-2">
      <span>{t("zone_filter")}</span>
      <div className="flex gap-3 mt-2">
        <select
          className=""
          defaultValue={zone}
          onChange={(e) => setZone(e.target.value as "commune" | "quarter")}
        >
          <option value="commune">{t("commune")}</option>
          <option value="quarter">{t("quarter")}</option>
        </select>

        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("select_an_element")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterComponent;
