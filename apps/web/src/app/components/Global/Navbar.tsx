import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";
import { FaRegHeart, FaRegBell, FaRegComment} from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 border-b flex justify-between items-center bg-white fixed">
      <div className="text-2xl font-bold text-black">Trendies</div>
      <div className="flex gap-6 items-center text-xl text-black">
        <FaRegHeart className="cursor-pointer outlined" />
        <FaRegComment className="cursor-pointer" />
        <FaRegBell className="cursor-pointer" />
        <MdOutlineShoppingBag className="cursor-pointer" />
        <FaRegUser className="cursor-pointer" />
        <Link href="/">
          <GoSignOut className="cursor-pointer text-red-600" />
        </Link>
      </div>
    </nav>
  );
}
