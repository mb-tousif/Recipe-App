"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Search submitted:", search);
  };
  return (
    <div>
      <h1 className="text-4xl font-bold pt-8 text-center text-gray-800 mb-4">
        Welcome to Recipe App
      </h1>
      <p className="text-lg text-gray-800 text-center mb-8">
        Discover and enjoy a variety of delicious recipes
      </p>
      <div className="flex items-center justify-center p-6">
        <div className="flex items-center max-w-xl p-2 mx-auto bg-gray-400 rounded-lg">
          <div className="sm:w-screen w-full">
            <input
              type="search"
              placeholder="Search for recipes"
              className="w-full sm:min-w-2/3 p-2 min-w-xl bg-gray-400 text-gray-50 rounded-full focus:outline-none"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`flex items-center bg-[#583E26] justify-center w-12 h-12 text-gray-50 rounded-r-lg ${
                search.length > 0
                  ? "bg-[#583E26]"
                  : "bg-[#6e234e] cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={search.length === 0}
            >
              <svg
                className="w-6 h-6 text-gray-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center mb-10 items-center">
        <div class="relative flex max-w-[500px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div class="relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div class="mb-8 w-full">
              <h4 class="text-xl font-bold text-gray-700 text-center">
                All Recipe
              </h4>
              <p class="mt-2 text-base text-justify text-gray-700">
                Recipe is a collection of instructions that describes how to
                prepare or make something, especially a dish of prepared food.
                Here you can find most popular recipes.
              </p>
            </div>
            <div class="flex w-full items-center justify-between rounded-2xl bg-gray-500 p-3 shadow-3xl shadow-shadow-500">
              <Link href="/recipes/244dgg">
                <div class="flex justify-between items-center">
                  <div class="">
                    <img
                      class="h-[83px] w-[83px] rounded-lg"
                      src="https://img.freepik.com/free-photo/whole-chicken-grill-served-with-rice-garnish-white-plate_114579-873.jpg"
                      alt=""
                    />
                  </div>
                  <div class="ml-4 ">
                    <p class="text-base w-full font-medium text-gray-50">
                      Chicken Biryani
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
