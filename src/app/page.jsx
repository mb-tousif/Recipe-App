"use client";
import React, { useState } from "react";
import Link from "next/link";
import handleSearch from "@/utils/handleSearch";
import { useGetAllRecipesQuery } from "@/redux/app/recipe/recipeApi";
import Image from "next/image";

export default function Home() {
  const [search, setSearch] = useState("");
  const query = {};
  const handleQuery = handleSearch({
    searchQuery: search,
    delay: 600,
  });
  if (!!handleQuery) {
    query["search"] = handleQuery;
  }
  const { data, isLoading, isError} = useGetAllRecipesQuery({...query});
  if (isLoading)
    return (
      <div className="p-20 text-center font-bold text-2xl">Loading...</div>
    );
  if (isError) return <div>Something went wrong</div>;
  const recipes = data?.recipes.slice(0, 5)
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
          <div className="sm:w-screen w-full relative">
            <input
              type="search"
              className="w-full sm:min-w-2/3 p-2 min-w-xl bg-gray-400 text-gray-50 rounded-full focus:outline-none placeholder:text-gray-50 text-center"
              value={search}
              placeholder="Search for recipes"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mb-10 items-center">
        <div className="relative flex max-w-[500px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="mb-8 w-full">
              <h4 className="text-xl font-bold text-gray-700 text-center">
                All Recipe
              </h4>
              <p className="mt-2 text-base text-justify text-gray-700">
                Recipe is a collection of instructions that describes how to
                prepare or make something, especially a dish of prepared food.
                Here you can find most popular recipes.
              </p>
            </div>
            {recipes?.map((recipe) => (
              <div
                key={recipe?.id}
                className="flex w-full mb-3 items-center justify-between rounded-2xl bg-gray-500 p-3 shadow-3xl shadow-shadow-500"
              >
                <Link href={`/recipes/${recipe?.id}`}>
                  <div className="flex justify-between items-center">
                    <div className="">
                      <Image
                        src={recipe?.image}
                        width={83}
                        height={83}
                        className="h-[83px] w-[83px] rounded-lg"
                        alt={recipe?.title}
                      />
                    </div>
                    <div className="ml-4 ">
                      <p className="text-base w-full font-medium text-gray-50">
                        {recipe?.title}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
