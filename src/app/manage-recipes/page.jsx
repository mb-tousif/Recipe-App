"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ManageRecipes() {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      toast.error("You need to login to access this page.");
      router.push("/login");
    }
  }, [token, router]);
  return <div>ManageRecipes</div>;
}
