'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
