"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, signup } from "../../../../lib/auth";
import Cookies from "js-cookie";
import Loader from "../Global/Loader";
import toast from "react-hot-toast";

interface Props {
  mode: "signup" | "login";
}

export default function AuthForm({ mode }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refCode = searchParams.get("code");
    if (refCode) Cookies.set("code", refCode, { expires: 7 });
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const ref = Cookies.get("code");

      let response;
      if (mode === "signup") {
        response = await signup({
          email,
          name,
          password,
          ref: ref || undefined,
        });
        toast.success("Signup successful");
      } else {
        response = await login({ email, password });
        toast.success("Login successful");
      }

      if (response?.user?.referralCode) {
        localStorage.setItem("referralCode", response.user.referralCode);
        localStorage.setItem("userName", response.user.name);

      }

      router.push("/dashboard");
      setLoading(false);

    } catch (err) {
      toast.error("Error Logging in");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          >
            {mode === "signup" ? "Sign Up" : "Login"}
          </button>
        </>
      )}
    </form>
  );
}
