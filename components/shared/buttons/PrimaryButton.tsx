import styles from "@styles/shared/buttons/primary-button.module.scss";

const PrimaryButton = ({
  children,
  variants,
}: {
  children: string;
  variants: string[];
}) => {
  return (
    <span className={styles.buttonWrapper}>
      <button
        type="button"
        className={`${styles.button} ${variants.map((name) => {
          return " " + styles[name] + " ";
        })}`}
      >
        {children}
      </button>
    </span>
  );
};

export default PrimaryButton;
