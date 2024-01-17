"use client";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { removeToken } from "@/redux/app/auth/authSlice";

export default function AuthState() {
    const token = useSelector((state) => state.auth.token);
    const [authToken, setAuthToken] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      if (token) {
        setAuthToken(true);
      }
    }, [token, authToken, dispatch]);
    const handleAuth = () => {
        dispatch(removeToken());
        setAuthToken(false);
    };
  return (
    <>
      {authToken ? (
        <Link
          onClick={() => handleAuth()}
          href="/"
          className="px-3 block sm:flex text-gray-50 hover:bg-slate-700 py-2 justify-end rounded-md text-base md:text-lg font-medium"
        >
          Log out
        </Link>
      ) : (
        <Link
          href="/login"
          className="px-3 block sm:flex text-gray-50 hover:bg-slate-700 py-2 justify-end rounded-md text-base md:text-lg font-medium"
        >
          Log in
        </Link>
      )}
    </>
  );
}
