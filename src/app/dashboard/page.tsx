"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const Dashboard = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log(session);
      router.replace("/dashboard");
    }
  }, [session, router]);
  console.log(new Date().getTime());
  return <div>Dashboard</div>;
};

export default Dashboard;
