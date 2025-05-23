"use client";

import { useEffect } from "react";
import ReferalBanner from "@/app/components/Dashboard/ReferalBanner";

export default function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

  useEffect(() => {
    if (!baseUrl) {
      console.error("API base URL is missing!");
      return;
    }

    fetch(baseUrl)
      .then((res) => res.text())
      .then((data) => console.log("API says:", data))
      .catch((err) => console.error("Fetch failed:", err));
  }, [baseUrl]);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black px-4 py-12">
      {/* Top Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          WELCOME BACK, HATIM SHABBIR
        </h1>
        <p className="text-lg md:text-2xl font-medium text-gray-500">
          Your next favorite piece is waiting for you.
        </p>
      </div>

      {/* Divider */}
      <hr className="my-8 border-t border-gray-300 w-full" />

      {/* Referral Section */}
      <ReferalBanner />
    </div>
  );
}
