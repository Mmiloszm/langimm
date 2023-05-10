import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import { useContext } from "react";
import styles from "@styles/dashboard/dashboard.module.scss";
import DashboardFilters from "@/components/dashboard/DashboardFilters";

function Dashboard() {
  return (
    <main className={styles.wrapper}>
      <DashboardFilters />
    </main>
  );
}
export default Dashboard;
