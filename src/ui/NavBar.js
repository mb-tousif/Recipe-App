"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdFoodBank, MdEmojiFoodBeverage } from "react-icons/md";
import AuthState from "./AuthState";

const navBarRoutes = [
    {
        id: 1,
        name: "Home",
        link: "/",
    },
    {
        id: 2,
        name: "Recipes",
        link: "/recipes",
    },
    {
        id: 3,
        name: "Manage Recipes",
        link: "/manage-recipes",
    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-slate-800 w-full">
      <div className="flex items-center justify-between h-16">
        <div className="flex flex-auto">
          <div className="hidden mx-auto my-auto sm:block">
            <div className="flex justify-end -mr-2 items-baseline">
              {navBarRoutes?.map((route) => (
                <Link
                  key={route?.id}
                  href={route?.link}
                  className="px-3 py-2 text-gray-50 justify-end rounded-md text-base md:text-lg font-medium hover:bg-slate-700"
                >
                  {route?.name}
                </Link>
              ))}
              <AuthState />
            </div>
          </div>
          <div className="sm:hidden flex justify-evenly text-gray-50">
            <div
              className="flex justify-items-end"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <MdFoodBank className="ml-4 w-8 h-8" />
              ) : (
                <MdEmojiFoodBeverage className="ml-4 w-8 h-8" />
              )}
            </div>
            <p className="text-lg min-w-[250px] font-medium text-end">
              Recipe App
            </p>
          </div>
        </div>
      </div>
      <div
        className={`${
          open ? "block" : "hidden"
        } absolute z-20 bg-[#071948] w-full sm:hidden text-gray-50 opacity-90`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 translate ease-in-out duration-300">
          {navBarRoutes?.map((route) => (
            <Link
              key={route?.id}
              href={route?.link}
              className="block px-3 py-2 hover:bg-slate-700 rounded-md text-base font-medium"
            >
              {route?.name}
            </Link>
          ))}
          <AuthState />
        </div>
      </div>
    </section>
  );
}
