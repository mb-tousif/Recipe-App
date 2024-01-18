"use client";
import { useSignUpUserMutation } from "@/redux/app/auth/authApiEndPoints";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Signup() {
  const [ signupUser ] = useSignUpUserMutation();
  const { register, handleSubmit, formState: { errors }} = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const res = await signupUser(data).unwrap();
      toast.success(res.message);
      router.push("/login");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center p-8 text-gray-50">
      <div className="bg-gray-600 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-[#57394a] rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create an account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 text-gray-800 border rounded-lg"
              placeholder="James Brown"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-rose-600 text-center text-sm">
                Full Name is required.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 text-gray-800 border rounded-lg"
              {...register("email", { required: true })}
              placeholder="breakpointart@info.com"
            />
            {errors.email && (
              <p className="text-rose-600 text-center text-sm">
                Email Address is required.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              className="w-full px-4 text-gray-800 py-2 border rounded-lg"
              {...register("password", { required: true })}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-rose-600 text-center text-sm">
                Password is required.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#583E26] text-white px-4 py-2 rounded-lg hover:bg-[#57394a] outline-none"
          >
            Register
          </button>
          <p className="text-gray-50 text-xs sm:text-base text-center mt-4">
            Already have an account?
            <Link href="/login" className="ml-1 hover:text-blue-400">
              log in here .
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
