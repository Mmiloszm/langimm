import styles from "@styles/shared/loaders/basic-loader.module.scss";
const BasicLoader = () => {
  return (
    <div className={styles.ldsEllipsis}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </div>
  );
};

export default BasicLoader;
