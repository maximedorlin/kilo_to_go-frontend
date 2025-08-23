import * as z from "zod";

export const PatrimoineCategoryValidator = z.object({
  name: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "required" }),
});

export const PatrimoineValidator = z.object({
  name: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "required" })
    .max(255, { message: "too_long" }),
  description: z
    .string({ message: "required" })
    .trim()
    .max(1000, { message: "too_long" })
    .nullable()
    .optional(),
  latitude: z.preprocess(
    (val) => (val !== "" && val !== null ? Number(val) : null),
    z
      .number({ message: "required" })
      .min(-90, { message: "required" })
      .max(90, { message: "too_long" })
  ),
  longitude: z.preprocess(
    (val) => (val !== "" && val !== null ? Number(val) : null),
    z
      .number({ message: "required" })
      .min(-180, { message: "required" })
      .max(180, { message: "too_long" })
  ),
  quartier: z
    .number({ message: "required" })
    .int({ message: "must_be_an_integer" })
    .min(0, { message: "cannot_be_negative" })
    .max(2147483647, { message: "too_large" })
    .nullable()
    .optional(),
  commune: z
    .number({ message: "required" })
    .int({ message: "must_be_an_integer" })
    .min(0, { message: "cannot_be_negative" })
    .max(2147483647, { message: "too_large" })
    .nullable()
    .optional(),
  zone_chalandise: z
    .number({ message: "required" })
    .int()
    .min(0, { message: "cannot_be_negative" })
    .max(2147483647, { message: "too_large" })
    .nullable()
    .optional(),
  categorie: z
    .number({ message: "required" })
    .int()
    .min(0, { message: "cannot_be_negative" })
    .max(2147483647, { message: "too_large" }),
});

export const QuarterValidator = z.object({
  name: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "required" })
    .max(255, { message: "too_long" }),
  description: z
    .string({ message: "required" })
    .trim()
    .max(1000, { message: "too_long" })
    .nullable()
    .optional(),
  geom_real: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "required" }),
});

export const ZoneChalandiseValidator = z.object({
  name: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "required" })
    .max(255, { message: "too_long" }),
  description: z
    .string({ message: "required" })
    .trim()
    .max(1000, { message: "too_long" })
    .nullable()
    .optional(),
  parent: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "required" }),
  geom_real: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "required" }),
});

export const ZoneManagerValidator = z.object({
  controller: z.string({ message: "required" }).trim(),
});

export const RollingStockValidator = z.object({
  license_plate: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "license_plate_required" }),
  vehicle_type: z.enum(["VL", "PL", "MT", "ENG", "OTHER"], {
    message: "invalid_vehicle_type",
  }),
  brand: z
    .string({ message: "required" })
    .trim()
    .min(1, { message: "brand_required" }),
  model: z.string().optional().nullable(),
  manufacture_year: z
    .number({ invalid_type_error: "year_must_be_a_number" })
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional()
    .nullable(),
  acquisition_date: z.string().optional().nullable(),
  chassis_number: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  status: z
    .enum(["ACTIVE", "BROKEN", "SOLD", "RETIRED"], {
      message: "invalid_status",
    })
    .optional(),
  notes: z.string().optional().nullable(),
});
