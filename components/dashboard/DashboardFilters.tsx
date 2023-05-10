import Filter from "./filters/Filter";
import Sort from "./filters/Sort";
import styles from "@styles/dashboard/dashboard.module.scss";

const DashboardFilters = () => {
  return (
    <div className={styles.filtersWrapper}>
      <Filter /> <Sort />
    </div>
  );
};

export default DashboardFilters;
