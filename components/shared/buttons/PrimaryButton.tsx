import styles from "@styles/shared/buttons/primary-button.module.scss";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const PrimaryButton = ({
  children,
  variants,
  buttonType,
}: {
  children: string;
  variants: string[];
  buttonType?: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <span className={styles.buttonWrapper}>
      <button
        type={buttonType ? buttonType : "button"}
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
