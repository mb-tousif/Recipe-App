"use client";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
    const navigate  = useRouter();
  return (
    <div class="bg-gray-200 w-full px-16 md:px-0 flex items-center justify-center">
      <div class="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p class="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
          500
        </p>
        <p class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
            Internal Server Error
        </p>
        <p class="text-gray-500 mt-8 py-2 border-y-2 text-center">
            {error.message}
        </p>
        <button class="bg-[#583E26] text-gray-50 px-4 py-2 rounded-lg mt-4" onClick={() => {
            navigate.push("/");
        }}>
            Go Back Home
        </button>
      </div>
    </div>
  );
}
