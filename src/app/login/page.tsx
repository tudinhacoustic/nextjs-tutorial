"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserValidator from "@/validation/user";
import ErrorMessage from "@/validation/errorMessage";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { value, error } = UserValidator.login().validate(user);
    if (error) {
      setError(ErrorMessage.handleErrorMessage(error));
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });
    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Sign In
          </button>
          <p className="text-red-600 text-[16px] mt-4 mb-4">{error && error}</p>
        </form>
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          // onClick={() => {
          //   signIn("github");
          // }}
        >
          Sign In with Github
        </button>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link className="block text-center text-blue-500 hover:underline mt-2" href="/register">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
