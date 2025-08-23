"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

interface ExportDataProps {
  onExport: (fileFormat: "csv" | "excel2007") => void;
  initialFormat?: "csv" | "excel2007";
  className?: string;
}

export function ExportData({
  onExport,
  initialFormat = "excel2007",
  className = "",
}: ExportDataProps) {
  const [fileFormat, setFileFormat] = useState<"csv" | "excel2007">(
    initialFormat
  );

  const { t } = useTranslation();
  const handleExport = () => {
    onExport(fileFormat);
  };

  return (
    <div className={`flex items-center justify-end gap-3 ${className}`}>
      <select
        className="
      border border-gray-300 dark:border-gray-600
      px-3 py-1.5 rounded-lg
      bg-white dark:bg-gray-800
      text-gray-700 dark:text-gray-200
      focus:outline-none focus:border-primary-500
      transition-all shadow-sm
      hover:border-gray-400 dark:hover:border-gray-500
      text-sm
    "
        value={fileFormat}
        onChange={(e) => setFileFormat(e.target.value as "csv" | "excel2007")}
      >
        <option value="excel2007">Excel (.xlsx)</option>
        <option value="csv">CSV (.csv)</option>
      </select>

      <Button
        onClick={handleExport}
        variant="outline"
        className="
      rounded-full
      border border-gray-300 dark:border-gray-600
      text-gray-700 dark:text-gray-200
      hover:bg-gray-100 dark:hover:bg-gray-700
      bg-transparent
      px-4 py-1.5
      shadow-sm
      transition-colors
      flex items-center gap-2
      text-sm
      hover:shadow-md
    "
      >
        <Download className="w-4 h-4" />
        {t("export")}
      </Button>
    </div>
  );
}
