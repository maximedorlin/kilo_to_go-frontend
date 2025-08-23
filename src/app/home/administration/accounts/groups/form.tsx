"use client";
import ErrorComponent from "@/components/dashboard/ErrorComponent";
import CancelButton from "@/components/ui/CancelButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-btn";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  GroupInterface,
  PermissionInterface,
} from "@/interfaces/auth/authinterfaces";
import { useNavigateBack } from "@/lib/navigate-back";
import {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
} from "@/store/apis/auth/groups.api";
import { useGetPermissionsQuery } from "@/store/apis/auth/permissions.api";
import { GroupValidator } from "@/validators/authvalidators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaSave } from "react-icons/fa";

interface Props {
  initial?: GroupInterface;
}

const GroupForm: React.FC<Props> = ({ initial }) => {
  const { t } = useTranslation();
  const navigateBack = useNavigateBack(1);
  const form = useForm<GroupInterface>({
    resolver: zodResolver(GroupValidator),
    defaultValues: initial ? { ...initial } : { name: "" },
  });
  const [selectAll, setSelectAll] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(!!checked);

    Object.keys(permissionRefs.current).forEach((permissionId) => {
      const ouiRadio = permissionRefs.current[permissionId];
      const radioGroup = ouiRadio?.closest('[role="radiogroup"]');

      if (!radioGroup) return;

      const radios = radioGroup.querySelectorAll('[role="radio"]');

      radios.forEach((radio: any) => {
        if (radio.getAttribute("value") === (checked ? "oui" : "non")) {
          if (radio.getAttribute("aria-checked") !== "true") {
            radio.click(); // Simulate selection
          }
        }
      });
    });
    setIsSelecting(false);
  };
  const permissionRefs = useRef<Record<string, HTMLButtonElement>>({});

  const { refetch } = useGetGroupsQuery();

  const {
    data: permissionsData,
    error,
    isFetching: isFetchingPermissions,
  } = useGetPermissionsQuery();

  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const [updateGroup, { isLoading: isLoadingUpdate }] =
    useUpdateGroupMutation();

  const [collectingRefs, setCollectingRefs] = React.useState(false);

  const handleSubmit = async () => {
    setCollectingRefs(true);
    const formValues = form.getValues();
    const selectedIds: string[] = [];

    // Collect selected permissions by checking DOM elements
    Object.keys(permissionRefs.current).forEach((permissionId) => {
      if (permissionRefs.current[permissionId]?.ariaChecked === "true") {
        selectedIds.push(permissionId);
      }
    });
    setCollectingRefs(false);

    // Use selectedIds for backend submission
    try {
      if (initial) {
        await updateGroup({
          data: {
            ...formValues,
            permissions: selectedIds as unknown as PermissionInterface[],
          },
          id: initial.id,
        }).unwrap();
        toast.success(t("group_updated_successfully"));
        await refetch();
        navigateBack(1);
      } else {
        await createGroup({
          ...formValues,
          permissions: selectedIds as unknown as PermissionInterface[],
        }).unwrap();
        toast.success(t("group_created_successfully"));
        await refetch();
        navigateBack(1);
      }
    } catch (error) {
      console.log("ERROR ", error);
      toast.error(t("an_error_occurred"));
    }
  };

  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="flex h-[calc(100vh-195px)] gap-4 pb-0">
      <div
        className={`w-full h-full bg-white p-5 pt-1 rounded-md shadow-lg  overflow-y-auto`}
      >
        <div className="py-5 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {initial ? t("update_group") : t("add_group")}
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => {
                handleSubmit();
              })}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required> {t("name")} </FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder={t("name")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative">
                <div className="text-center text-2xl font-bold">
                  <span>{t("permissions")}</span>
                  <hr className="my-2" />
                  <div className="flex items-center space-x-2 mb-4 p-2 border-b">
                    <Checkbox
                      id="select-all"
                      checked={selectAll}
                      onCheckedChange={(checked) => {
                        setIsSelecting(true);
                        setTimeout(() => {
                          handleSelectAll(checked as boolean);
                        }, 500);
                      }}
                    />
                    <label
                      htmlFor="select-all"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("select_all_permissions")}
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                  {permissionsData &&
                    (() => {
                      const groupsMap: Record<string, typeof permissionsData> =
                        {};

                      // Group permissions by suffix (same logic as first example)
                      permissionsData.forEach((permission) => {
                        const parts = permission.codename.split("_");
                        const suffix = parts.slice(1).join("_");
                        if (!groupsMap[suffix]) {
                          groupsMap[suffix] = [];
                        }
                        groupsMap[suffix].push(permission);
                      });

                      // Create styled JSX blocks for each group
                      return Object.entries(groupsMap).map(
                        ([suffix, groupPermissions], index) => (
                          <div
                            key={`group-${suffix}-${index}`}
                            className="mb-6 overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md dark:border-gray-700"
                          >
                            {/* Group Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 dark:from-gray-800 dark:to-gray-700">
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {t(suffix.replaceAll("_", " "))}
                              </h3>
                            </div>

                            {/* Permissions List */}
                            <div className="grid grid-cols-1 gap-4 p-6">
                              {groupPermissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="block lg:flex justify-between rounded-md border border-gray-100 bg-white p-4 shadow-xs transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                  <span className="text-md font-medium text-gray-700 break-all hyphens-auto dark:text-gray-300">
                                    {t(permission.codename)} {" ?"}
                                  </span>

                                  <RadioGroup
                                    className="mt-2 flex justify-between space-x-4"
                                    defaultValue={
                                      initial?.permissions?.some(
                                        (p) => p.id === permission.id
                                      )
                                        ? "oui"
                                        : "non"
                                    }
                                  >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem
                                          value="oui"
                                          ref={(el) => {
                                            if (el) {
                                              permissionRefs.current[
                                                permission.id
                                              ] = el;
                                            }
                                          }}
                                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-600"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-medium text-gray-700 dark:text-gray-300">
                                        {t("yes")}
                                      </FormLabel>
                                    </FormItem>

                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem
                                          value="non"
                                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-600"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-medium text-gray-700 dark:text-gray-300">
                                        {t("no")}
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      );
                    })()}

                  {isFetchingPermissions && (
                    <div className="flex items-center justify-center text-center h-[600px] w-full">
                      <Loader className="h-8 w-8 animate-spin text-primary text-center mx-auto" />
                    </div>
                  )}
                </div>
                {isSelecting && (
                  <div className="absolute inset-0 w-full h-full bg-white opacity-90 pointer-events-none cursor-wait flex justify-center items-center">
                    <Loader />
                  </div>
                )}
              </div>

              <motion.div
                className="fixed top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/3 flex justify-end gap-2 items-center"
                animate={{
                  y: [-2, 2],
                  rotate: [0.5, -0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <div className="fixed top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/3 flex justify-end gap-2 items-center">
                  <CancelButton depth={1} />

                  <LoadingButton
                    type="submit"
                    loading={isLoadingUpdate || isLoading || collectingRefs}
                    className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
                  >
                    <FaSave />
                    {t("save")}
                  </LoadingButton>
                </div>
              </motion.div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GroupForm;
