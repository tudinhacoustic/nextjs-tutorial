import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
const Dashboard = async () => {
  // const session = useSession();
  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     console.log(session);
  //     router.replace("/dashboard");
  //   }
  // }, [session, router]);
  // console.log(new Date().getTime());

  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return <div className="flex min-h-screen flex-col items-center justify-between p-24">Dashboard</div>;
};

export default Dashboard;
