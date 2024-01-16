import { GiCampCookingPot } from "react-icons/gi";

export default function Footer() {
  return (
    <div className="min-h-40 p-10 bg-slate-500">
        <div className="flex justify-center">
            <GiCampCookingPot className="w-20 h-20 text-gray-50" />
        </div>
      <p className="text-center text-lg text-gray-50">
        All right reserved & Copyright &#169; {new Date().getFullYear()}.
      </p>
    </div>
  );
}
