"use client";

import { useEffect } from "react";

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

  return <h1>Dashboard</h1>;
}
