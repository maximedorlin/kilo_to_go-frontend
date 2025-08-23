import { useAppDispatch } from "@/hooks/redux-toolkit";
import { useLazyGetUserProfileQuery } from "@/store/apis/auth/authentication.api";
import { loginSuccess } from "@/store/slices/authslice";
import React, { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [getProfile, { data, error }] = useLazyGetUserProfileQuery();
  const [isToken, setIsToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      getProfile();
    } else {
      setIsToken(false);
    }
  }, [getProfile]);

  useEffect(() => {
    if (data) {
      dispatch(loginSuccess({ isLoggedIn: true, user: data }));
    }
  }, [data, dispatch, error]);

  useEffect(() => {
    if (isToken == false) {
      window.location.replace("/web");
    }
  }, [isToken]);

  return <> {data && children}</>;
};

export default AuthProvider;
