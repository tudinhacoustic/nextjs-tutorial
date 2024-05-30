"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import UserValidator from "@/validation/user";
import ErrorMessage from "@/validation/errorMessage";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { value, error } = UserValidator.register().validate(user);
    if (error) {
      setError(ErrorMessage.handleErrorMessage(error));
      return;
    }
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        }),
      });
      if (!res.ok) {
        const msgRes = await res.text();
        const toJson = JSON.parse(msgRes);
        setError(toJson.message);
        return;
      }
      return router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form action="" onSubmit={handleSubmit}>
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
            Register
          </button>
        </form>
        {error ? <p className="text-[#f40000] text-base mt-4">{error}</p> : <></>}
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link className="block text-center text-blue-500 hover:underline mt-2" href="/login">
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;

// Because of his understanding of poverty, he has tried to contribute to a renewable project that helps more than 1000 unemployed workers get jobs.
