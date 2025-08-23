"use client";
import LanguageSwitcher from "@/components/web1/LanguageSwitcher";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import { useLazyGetUserProfileQuery } from "@/store/apis/auth/authentication.api";
import { loginSuccess, logout } from "@/store/slices/authslice";
import { Bell, LogOut, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { NotificationInterface } from "@/store/apis/auth/authentication.api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loader from "@/components/Loader";
import CustomLink from "@/components/CustumLink";
import { AnimatePresence, motion } from "motion/react";
import { format } from "date-fns";
import i18n from "@/locale/i18n";
import { enUS, fr } from "date-fns/locale";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import Link from "next/link";
// import FormFavoriteCreation from "./home/form";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
// import AuthProvider from "@/components/authprovider";
import { MdWarning } from "react-icons/md";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isHomePage = useAppSelector((state) => state.isHomePage);
  const [getProfile, { data, isFetching, error }] =
    useLazyGetUserProfileQuery();
  // const { data: notificationData, refetch } = useGetNotificationsQuery();
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      getProfile();
    }
  }, [getProfile]);

  useEffect(() => {
    if (data) {
      dispatch(loginSuccess({ isLoggedIn: true, user: data }));
    }
  }, [data, dispatch, getProfile]);

  const { t } = useTranslation();
  // const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  // const [updatNotificationStatut] = useUpdateNotificationsStatusMutation();
  const [selectedNotif, setSelectedNotif] =
    useState<NotificationInterface | null>(null);
  // useEffect(() => {
  //   if (!isLoggedIn && !isFetching && error) {
  //     // redirect(`/login?next=${pathname}`);
  //     router.push(`/web`);
  //   }
  // }, [isLoggedIn, data, isFetching, error, router]);

  const handleDisconnet = () => {
    dispatch(logout());
    localStorage.removeItem("access");
    router.push("/web");
  };
  const [viewNotif, setViewNotif] = useState<boolean>(false);

  useEffect(() => {
    console.log("Home page view", isHomePage);
  }, [isHomePage]);

  return (
    // <AuthProvider>
    <>
      {/* {isLoggedIn && ( */}
        <div className="relative min-h-screen  bg-background text-foreground custom-page--scrollbar">
          <main
            id="content"
            // ${
            //   value ? "md:ml-24" : "md:ml-64"
            // }
            // className={`px-7 mt-36 md:mt-0 overflow-x-hidden transition-[margin]  h-full`}
            className={`px-7 ${
              isHomePage.value ? "mt-0" : "mt-28"
            } md:mt-0 overflow-x-hidden transition-[margin] h-full`}
          >
            <div className="flex my-2 justify-between items-center">
              {isHomePage.value ? (
                <Link href="/home">
                  <div
                    className={`md:flex justify-center md:justify-between gap-1 items-center`}
                  >
                    <div className="w-16 h-16 z-20">
                      <Image
                        src={IMAGES.logo_cud_tranparent}
                        alt="Logo CUD"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <span className="md:text-4xl">{"SIG METIER"}</span>
                  </div>
                </Link>
              ) : (
                // <div className="md:flex justify-center md:justify-between gap-1 items-center"></div>
                <Link href="/home">
                  <div
                    className={`hidden md:flex justify-center md:justify-between gap-1 items-center`}
                  >
                    <div className="w-16 h-16 z-20">
                      <Image
                        src={IMAGES.logo_cud_tranparent}
                        alt="Logo CUD"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                    <span className="md:text-4xl">{"SIG METIER"}</span>
                  </div>
                </Link>
              )}

              <div className="flex gap-x-4 items-center relative">
                <LanguageSwitcher className="bg-transparent" />
                <div
                  title="Notifications"
                  className="flex justify-between gap-[2px] cursor-pointer"
                  onClick={() => setViewNotif(true)}
                >
                  {/* {notificationData && notificationData.length !== 0 ? ( */}
                  {/* <BellRing
                    className="w-6 h-6 text-red-700 fill-red-700"
                    fill="currentColor"
                  />
                ) : ( */}
                  <Bell
                    className="w-6 h-6"
                    // className="w-6 h-6 text-red-700 fill-red-700"
                    // fill="currentColor"
                  />
                  {/* )} */}
                  <div className="text-red-700 font-bold">
                    {/* {notificationData && notificationData.length !== 0 && (
                    <>{notificationData.length}</>
                  )} */}
                  </div>
                </div>
                <div>
                  <Link href="/home/administration">
                    <Settings size={24} /> {/* Taille de l'icône */}
                  </Link>
                </div>
                <AnimatePresence>
                  {viewNotif && (
                    <>
                      {/* Overlay pour fermer au clic en dehors */}
                      <div
                        onClick={() => setViewNotif(false)}
                        className="fixed inset-0 z-40 bg-black/10"
                      />

                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-0 top-14 z-50 w-[400px] max-h-[500px] overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200"
                      >
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-accent to-purple-yellow-200 text-white rounded-t-lg">
                          <h2 className="font-semibold text-md text-black">
                            Notification
                          </h2>
                          <button
                            onClick={() => setViewNotif(false)}
                            className="text-black hover:text-gray-200"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Liste des notifications */}
                        <div className="px-4 py-2">
                          {[].length > 0 ? (
                            [{ id: "", date_creation: "" }].map(
                              (element, index) => (
                                <div
                                  key={element.id}
                                  className="flex flex-col items-start gap-2 my-4"
                                >
                                  {/* Date de la notification */}
                                  {(index === 0 ||
                                    // format(
                                    //   new Date(
                                    //     notificationData[index - 1].date_creation
                                    //   ),
                                    //   "PPP",
                                    //   {
                                    //     locale:
                                    //       i18n.language === "fr" ? fr : enUS,
                                    //   }
                                    // ) !==
                                    format(
                                      new Date(element.date_creation),
                                      "PPP",
                                      {
                                        locale:
                                          i18n.language === "fr" ? fr : enUS,
                                      }
                                    )) && (
                                    <div className="w-full text-center text-xs text-gray-400 mb-2">
                                      {format(
                                        new Date(element.date_creation),
                                        "PPP",
                                        {
                                          locale:
                                            i18n.language === "fr" ? fr : enUS,
                                        }
                                      )}
                                    </div>
                                  )}

                                  {/* Ligne de notification affichée comme une conversation */}
                                  <div
                                    className="flex items-center gap-3 cursor-pointer bg-slate-200 hover:bg-gray-100 p-2 rounded-lg w-full"
                                    // onClick={() => setSelectedNotif(element
                                  >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                      <Bell className="h-5 w-5" />
                                    </div>

                                    <div className="flex-1">
                                      {/* Affichage de la date sous forme d'heure, comme une conversation */}
                                      <div className="text-sm text-gray-800">
                                        {format(
                                          new Date(element.date_creation),
                                          "iiii 'à' HH:mm",
                                          {
                                            locale:
                                              i18n.language === "fr"
                                                ? fr
                                                : enUS,
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )
                          ) : (
                            <div className="text-sm text-gray-500 text-center py-10">
                              {t("no_notifications")}
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* Dialogue pour afficher le contenu de la notification */}
                      {selectedNotif && (
                        <Dialog
                          open={false}
                          onOpenChange={() => setSelectedNotif(null)}
                        >
                          <DialogTrigger asChild>
                            <div />
                          </DialogTrigger>
                          <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto p-6">
                            <DialogHeader>
                              <DialogTitle>{t("notification")}</DialogTitle>
                            </DialogHeader>
                            <DialogDescription asChild>
                              <div
                                className="mt-4 text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: selectedNotif.content,
                                }}
                              />
                            </DialogDescription>
                            <div className="flex justify-end">
                              <Button
                                onClick={() => {
                                  // updatNotificationStatut(selectedNotif.id);
                                  // await refetch();
                                  setSelectedNotif(null);
                                }}
                                className="mt-4"
                              >
                                {t("set_as_read")}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </>
                  )}
                </AnimatePresence>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="link" className="translate-x-4">
                      <div className="h-10 w-10 bg-primary rounded-full">
                        <Image
                          src={IMAGES.header_avatar}
                          alt="Logo CUD"
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 bg-white">
                    <div className="grid gap-4 w-full">
                      <div className="w-full">
                        <CustomLink
                          href={"/home/account"}
                          absolutePath
                          className="flex gap-x-2 justify-center p-2 w-full hover:bg-primary/90"
                        >
                          {t("my_account")}
                          <User />
                        </CustomLink>
                      </div>
                      <div className="w-full">
                        <Button
                          onClick={handleDisconnet}
                          className="flex gap-x-2 w-full"
                        >
                          {t("logout")} <LogOut />
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>{children}</div>
          </main>
          <div className="absolute inset-0 z-[9999] cursor-not-allowed bg-white opacity-85 md:hidden">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black rounded-sm min-w-72 border p-5">
              <MdWarning className="text-4xl text-red-500 mx-auto" />{" "}
              {t("mobile_not_allowed")}
            </span>
          </div>
        </div>
      {/* )} */}
      {isFetching && <Loader />}
    </>
    // </AuthProvider>
  );
};

export default Layout;
