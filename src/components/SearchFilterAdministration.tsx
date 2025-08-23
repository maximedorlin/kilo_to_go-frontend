// "use client";
// import {
//   useGetGeoQuaterQuery,
//   useGetGeoSubdivisionQuery,
// } from "@/store/apis/administrative-delimitation.api";
// import React from "react";
// import { useTranslation } from "react-i18next";
// import { MultiSelect } from "./Multi-select";
// import { useForm, useWatch } from "react-hook-form";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

// export interface AdministrativeFilter {
//   quaters: string[];
//   subdivisions: string[];
// }

// interface SearchFilterAdministrationProps {
//   value?: AdministrativeFilter;
//   onChange?: (value: AdministrativeFilter) => void;
// }

// const SearchFilterAdministration = ({
//   value,
//   onChange,
// }: SearchFilterAdministrationProps) => {
//   const { data: quatersData } = useGetGeoQuaterQuery();
//   const { data: subdivisionsData } = useGetGeoSubdivisionQuery();
//   const { t } = useTranslation();

//   const form = useForm<AdministrativeFilter>({
//     defaultValues: value || {
//       quaters: [],
//       subdivisions: [],
//     },
//   });

//   // Surveiller les changements du formulaire et les remonter au parent
//   React.useEffect(() => {
//     const subscription = form.watch((value) => {
//       onChange?.(value as AdministrativeFilter);
//     });
//     return () => subscription.unsubscribe();
//   }, [form, onChange]);

//   const selectedSubdivisions = useWatch({
//     control: form.control,
//     name: "subdivisions",
//   });

//   const filteredQuaters = React.useMemo(() => {
//     if (
//       !quatersData ||
//       !selectedSubdivisions ||
//       selectedSubdivisions.length === 0
//     ) {
//       return quatersData?.features || [];
//     }

//     return quatersData.features.filter((quater) =>
//       selectedSubdivisions.includes(quater.properties.subdivision)
//     );
//   }, [quatersData, selectedSubdivisions]);

//   return (
//     <div>
//       <div className="font-semibold">
//         {t("administrative_filters")}

//         <Form {...form}>
//           <form className="grid grid-cols-2 gap-4 my-4">
//             <FormField
//               control={form.control}
//               name="subdivisions"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("subdivisions")}</FormLabel>
//                   <FormControl>
//                     <MultiSelect
//                       options={
//                         subdivisionsData
//                           ? subdivisionsData.features.map((e) => ({
//                               label: e.properties.name_subdivision,
//                               value: e.id,
//                             }))
//                           : []
//                       }
//                       onValueChange={(values) => {
//                         field.onChange(values);
//                         form.setValue("quaters", []);
//                       }}
//                       defaultValue={field.value}
//                       placeholder={t("select_subdivisions")}
//                       variant="inverted"
//                       animation={2}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="quaters"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("quaters")}</FormLabel>
//                   <FormControl>
//                     <MultiSelect
//                       options={filteredQuaters.map((e) => ({
//                         label: e.properties.name_quater,
//                         value: e.id,
//                       }))}
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       placeholder={
//                         selectedSubdivisions?.length > 0
//                           ? t("select_quaters")
//                           : t("select_subdivisions_first")
//                       }
//                       variant="inverted"
//                       animation={2}
//                       maxCount={3}
//                       disabled={
//                         !selectedSubdivisions ||
//                         selectedSubdivisions.length === 0
//                       }
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SearchFilterAdministration;

// export interface AdminCQLFilter {
//   quaterFilter?: string;
//   subdivisionFilter?: string;
//   combinedFilter?: string;
// }

// export const buildAdminCQLFilters = (
//   filters: AdministrativeFilter
// ): AdminCQLFilter => {
//   const quaterFilter =
//     filters.quaters.length > 0
//       ? `quater_id IN (${filters.quaters
//           .map((id) => `'${id.replace(/'/g, "''")}'`)
//           .join(", ")})`
//       : undefined;

//   const subdivisionFilter =
//     filters.subdivisions.length > 0
//       ? `subdivision_id IN (${filters.subdivisions
//           .map((id) => `'${id.replace(/'/g, "''")}'`)
//           .join(", ")})`
//       : undefined;

//   const combinedFilter = [quaterFilter, subdivisionFilter]
//     .filter(Boolean)
//     .join(" AND ");

//   return {
//     quaterFilter,
//     subdivisionFilter,
//     ...(combinedFilter ? { combinedFilter } : {}),
//   };
// };
