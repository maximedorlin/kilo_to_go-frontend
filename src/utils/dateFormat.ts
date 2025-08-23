import { format, parseISO } from "date-fns";
import { fr, enUS } from "date-fns/locale";

export function formatDate(
  isoDate: string,
  lang: string = "fr"
): string {
  const locale = lang === "fr" ? fr : enUS;
  return format(parseISO(isoDate), "PPP", { locale });
}
