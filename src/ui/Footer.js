import { GiCampCookingPot } from "react-icons/gi";

export default function Footer() {
  return (
    <div className="min-h-40 p-10 bg-slate-600">
      <div className="flex justify-center">
        <GiCampCookingPot className="w-20 h-20 text-[#e4951e]" />
      </div>
      <p className="text-center text-2xl font-semibold text-gray-50">
        Recipe App
      </p>
      <p className="text-center text-lg text-gray-50">
        All right reserved & Copyright &#169; {new Date().getFullYear()}.
      </p>
    </div>
  );
}
