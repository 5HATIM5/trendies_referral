"use client";

import { useEffect, useState } from "react";
import ReferalBanner from "@/app/components/Dashboard/ReferalBanner";
import { getAllReferrals } from "../../../lib/auth";
import ReferalList from "../components/Dashboard/ReferalList";

type Referral = {
  name: string;
  email: string;
  createdAt: Date;
};

export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const [referralList, setReferralList] = useState<Referral[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setUserName(userName || "");
    if (!baseUrl) {
      console.error("API base URL is missing!");
      return;
    }

    const fetchReferrals = async () => {
      try {
        const referralCode = localStorage.getItem("referralCode");
        if (!referralCode) {
          console.error("Referral code not found!");
          return;
        }
        const response = await getAllReferrals(referralCode);
        setReferralList(response);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReferrals();
  }, [baseUrl]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black px-4 py-12 max-w-4xl mx-auto">
      {/* Top Section */}
      <div className="text-center ">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-20 uppercase">
          WELCOME BACK, {userName}
        </h1>
        <p className="text-lg md:text-2xl font-medium text-gray-500">
          Your next favorite piece is waiting for you.
        </p>
      </div>

      {/* Divider */}
      <hr className="my-8 border-t border-gray-300 w-full" />

      {/* Referral Banner */}
      <ReferalBanner />

      {/* Referral List */}
      <ReferalList referrals={referralList} />
    </div>
  );
}
