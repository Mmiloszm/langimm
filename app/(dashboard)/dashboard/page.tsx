"use client";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useContext } from "react";

function Dashboard() {
  const { isAuthenticated, logout } = useContext(UserContext);
  return (
    <div>
      <span>{`zalogowany: ${isAuthenticated}`}</span>
      <Link href={"/signin"}>Klik</Link>
      <button
        onClick={() => {
          logout();
        }}
      ></button>
    </div>
  );
}
export default Dashboard;
