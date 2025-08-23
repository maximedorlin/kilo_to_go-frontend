"use client";

import { useState } from 'react';
import { FaLock, FaEnvelope, FaSignInAlt, FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../../services/authService';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginUser(formData.email, formData.password);
      router.push('/');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center mb-4">
                <FaSignInAlt className="text-blue-600 text-3xl mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">Connexion à KiloToGo</h2>
              </div>
              <p className="text-gray-600">Accédez à votre espace personnel</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                <p className="text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Se connecter
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou connectez-vous avec</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  <FaGoogle className="text-red-500 mr-2" />
                  Google
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  <FaFacebook className="text-blue-600 mr-2" />
                  Facebook
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-6">
                Vous n'avez pas de compte ?{' '}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                  Créez-en un
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



// "use client";

// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { PasswordInput } from "@/components/ui/passwordinput";
// import toast from "react-hot-toast";
// import { useLoginMutation } from "@/store/apis/auth/authentication.api";
// import { LoginValidator } from "@/validators/loginvalidator";
// import { LoadingButton } from "@/components/ui/loading-btn";
// import { useRouter, useSearchParams } from "next/navigation";
// // import { useAppDispatch } from "@/hooks/redux-toolkit";
// // import { loginSuccess } from "@/store/slices/authslice";
// import { useTranslation } from "react-i18next";
// import React from "react";
// import { IMAGES } from "@/constants/images";

// export default function Home() {
//   const [login, { isLoading }] = useLoginMutation();
//   // const dispatch = useAppDispatch();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const next = searchParams.get("next");
//   const redirectTo = next || "/home/administration/accounts/users";

//   // const redirectTo = next || "/home";

//   const form = useForm<z.infer<typeof LoginValidator>>({
//     resolver: zodResolver(LoginValidator),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const { t } = useTranslation();

//   const handleSubmit = async () => {
//     try {
//       await login({ ...form.getValues() })
//         .unwrap()
//         .then((data) => {
//           toast.success(t("successfully_connected"));
//           localStorage.setItem("access", JSON.stringify(data.access));
//           localStorage.setItem("refresh", JSON.stringify(data.refresh));
//           // dispatch(loginSuccess({ isLoggedIn: true, user: data.token.user }));
//           router.replace(redirectTo); // Redirige après succès
//         });
//     } catch (error) {
//       toast.error(t("connection_failed"));
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
//       style={{ backgroundImage: "url('/images/dla_city.jpg')" }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/40 z-0" />

//       {/* Content Wrapper */}
//       <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
//         {/* Logo */}
//         <div className="w-20 h-20 sm:w-24 sm:h-24">
//           <Image
//             src={IMAGES.logo_cud_tranparent}
//             alt="Logo CUD"
//             width={100}
//             height={100}
//             className="object-contain w-full h-full"
//           />
//         </div>

//         {/* Title */}
//         <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold text-center">
//           {t("connect_yourself")}
//         </h1>

//         {/* Form Wrapper */}
//         <div className="bg-white/70 backdrop-blur-md px-6 py-8 sm:p-8 rounded-xl w-full max-w-lg shadow-lg space-y-6">
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(() => {
//                 handleSubmit();
//                 // router.push("/home");
//               })}
//               className="space-y-6"
//             >
//               <div className="flex flex-col space-y-5">
//                 {/* Email */}
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>{t("email")}</FormLabel>
//                       <FormControl>
//                         <Input
//                           className="bg-white/95 rounded-lg"
//                           placeholder="example@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Password */}
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>{t("password")}</FormLabel>
//                       <FormControl>
//                         <PasswordInput
//                           className="bg-white/95 rounded-lg"
//                           placeholder="************"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Forgot password */}
//               <div className="flex justify-end">
//                 <Link href="#" className="text-primary text-sm hover:underline">
//                   {t("forgot_password")}?
//                 </Link>
//               </div>

//               {/* Submit Button */}
//               <LoadingButton
//                 loading={isLoading}
//                 type="submit"
//                 className="w-full"
//                 variant="default"
//               >
//                 {t("login")}
//               </LoadingButton>
//             </form>
//           </Form>
//         </div>

//         {/* Footer */}
//         <div className="text-white text-xs text-center mt-4">
//           COPYRIGHT © {new Date().getFullYear()} Powered by Afreetech
//         </div>
//       </div>
//     </div>
//   );
// }

// // "use client";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import * as z from "zod";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import Link from "next/link";
// // import { PasswordInput } from "@/components/ui/passwordinput";
// // import toast from "react-hot-toast";
// // import { useLoginMutation } from "@/store/apis/auth/authentication.api";
// // import { LoginValidator } from "@/validators/loginvalidator";
// // import { LoadingButton } from "@/components/ui/loading-btn";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import { useAppDispatch } from "@/hooks/redux-toolkit";
// // import { loginSuccess } from "@/store/slices/authslice";
// // import { useTranslation } from "react-i18next";
// // import React, { Suspense } from "react";
// // import Loader from "@/components/Loader";
// // const LoginComponent = () => {
// //   const [login, { isLoading }] = useLoginMutation();
// //   const dispatch = useAppDispatch();
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const next = searchParams.get("next");
// //   const redirectTo = next || "/dashboard/home";

// //   const form = useForm<z.infer<typeof LoginValidator>>({
// //     resolver: zodResolver(LoginValidator),
// //     defaultValues: {
// //       username: "",
// //       password: "",
// //     },
// //   });

// //   const { t } = useTranslation();

// //   const handleSubmit = async () => {
// //     try {
// //       await login({ ...form.getValues() })
// //         .unwrap()
// //         .then((data) => {
// //           toast.success(t("successfully_connected"));
// //           localStorage.setItem("access", JSON.stringify(data.token.access));
// //           localStorage.setItem("refresh", JSON.stringify(data.token.refresh));
// //           dispatch(loginSuccess({ isLoggedIn: true, user: data.token.user }));
// //           router.replace(redirectTo); // Redirige après succès
// //         });
// //     } catch (error) {
// //       toast.error(t("connection_failed"));
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b  from-slate-100 via-red-100 to-yellow-50">
// //         <p className="text-4xl bg-gradient-to-r  from-green-600 via-red-600 to-yellow-600 p-8 top-0 bg-clip-text text-transparent">
// //           {t("welcome")}
// //         </p>
// //         <div className="border-2 p-4 w-[80%] xl:w-[55%] rounded-xl  bg-white/20 backdrop-blur py-10">
// //           <Form {...form}>
// //             <form
// //               onSubmit={form.handleSubmit(() => {
// //                 handleSubmit();
// //               })}
// //               className="space-y-8"
// //             >
// //               <div className="flex flex-col gap-x-3">
// //                 <FormField
// //                   control={form.control}
// //                   name="username"
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>{t("username")}</FormLabel>
// //                       <FormControl className="flex-1">
// //                         <Input
// //                           className="bg-transparent rounded-lg ring-0 focus:ring-0 focus-visible:ring-0"
// //                           placeholder="johndoe"
// //                           {...field}
// //                         />
// //                       </FormControl>

// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />

// //                 <FormField
// //                   control={form.control}
// //                   name="password"
// //                   render={({ field }) => (
// //                     <FormItem>
// //                       <FormLabel>{t("password")}</FormLabel>
// //                       <FormControl>
// //                         <PasswordInput
// //                           className="bg-transparent rounded-lg ring-0 focus:ring-0 focus-visible:ring-0"
// //                           prefix="sd"
// //                           placeholder="************"
// //                           {...field}
// //                         />
// //                       </FormControl>

// //                       <FormMessage />
// //                     </FormItem>
// //                   )}
// //                 />
// //               </div>

// //               <div className="flex justify-end">
// //                 <Link href={"/forgot"} className="text-primary">
// //                   {t("forgot_password")}
// //                 </Link>
// //               </div>
// //               <LoadingButton
// //                 loading={isLoading}
// //                 type="submit"
// //                 className="w-full"
// //                 variant={"destructive"}
// //               >
// //                 {t("login")}
// //               </LoadingButton>
// //             </form>
// //           </Form>
// //         </div>
// //       </div>
// //       <div className="w-full login_right_container hidden xl:block  "></div>
// //     </div>
// //   );
// // };

// // const Login = () => {
// //   return (
// //     <Suspense fallback={<Loader />}>
// //       <LoginComponent />
// //     </Suspense>
// //   );
// // };

// // export default Login;
