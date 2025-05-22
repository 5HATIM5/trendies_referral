"use client";

import { useEffect } from "react";

export default function Dashboard() {

    useEffect(() => {
        fetch("http://localhost:3001")
          .then(res => res.text())
          .then(data => console.log("API says:", data));
      }, []);

  return (
   <h1>Dashboard</h1>
  );
}
