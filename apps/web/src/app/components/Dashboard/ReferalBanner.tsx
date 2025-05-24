"use client";

import { useEffect } from "react";
import { useState } from "react";

export default function ReferalBanner() {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    if (localStorage.getItem("referralCode")) {
      setReferralLink(process.env.NEXT_PUBLIC_API_URL + "/user/referrals/?code=" + localStorage.getItem("referralCode"));
    }

    console.log(referralLink);
  }, [referralLink]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black text-white rounded-2xl p-6 md:p-10 max-w-2xl mx-auto text-center shadow-xl ">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
      Refer a Friend & Earn Rewards 🎁
    </h2>
    <p className="text-gray-200 mb-6">
      Share your exclusive link with friends and unlock special bonuses.
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <input
        type="text"
        readOnly
        value={referralLink}
        className="flex-1 px-4 py-2 rounded-md border border-gray-600 bg-white text-black text-sm w-full max-w-md"
      />
      <button
        onClick={handleCopy}
        className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  </div>
  );
}
