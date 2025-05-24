"use client";

import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";
import { FaRegHeart, FaRegBell, FaRegComment } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { logout } from "../../../../lib/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('referralCode');
      localStorage.removeItem('userName');
      router.push('/');              
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <nav className="w-full px-6 py-4 border-b flex justify-between items-center bg-white fixed">
      <div className="text-2xl font-bold text-black">Trendies</div>
      <div className="flex gap-6 items-center text-xl text-black">
        <FaRegHeart className="cursor-pointer outlined" />
        <FaRegComment className="cursor-pointer" />
        <FaRegBell className="cursor-pointer" />
        <MdOutlineShoppingBag className="cursor-pointer" />
        <FaRegUser className="cursor-pointer" />
        <GoSignOut
          className="cursor-pointer text-red-600"
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
}
