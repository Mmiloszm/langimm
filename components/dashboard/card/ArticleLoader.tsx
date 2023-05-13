import styles from "@styles/dashboard/article-card/article-loader.module.scss";
const ArticleLoader = () => {
  return (
    <div className={styles.ldsEllipsis}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
    </div>
  );
};

export default ArticleLoader;
