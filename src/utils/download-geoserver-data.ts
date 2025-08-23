import { convertToCQLFilters } from "@/components/SearchFilterComponent";
import toast from "react-hot-toast";

export async function downloadGeoserverData(
  options: {
    layerNamespace: string;
    layerName: string;
    fileFormat: string;
    filters: any;
    fieldConfig: any;
  },
  t: (key: string) => string
) {
  try {
    const { layerNamespace, layerName, fileFormat, filters, fieldConfig } =
      options;
    const link = document.createElement("a");

    const blobUrl = [
      `${process.env.NEXT_PUBLIC_GEOSERVER_URL}${layerNamespace}/ows?service=WFS&version=1.0.0`,
      `request=GetFeature`,
      `typeName=${layerNamespace}:${layerName}`,
      `outputFormat=${fileFormat}`,
      filters
        ? `CQL_FILTER=${encodeURIComponent(
            convertToCQLFilters(filters, fieldConfig)
          )}`
        : null,
    ]
      .filter(Boolean)
      .join("&");

    link.href = blobUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    toast.success(t("downloaded_successfully"));
    return true;
  } catch (error) {
    toast.error(t("download_failed"));
    console.error("Download failed:", error);
    return false;
  }
}
