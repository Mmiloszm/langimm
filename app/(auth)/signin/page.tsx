import AuthForm from "@/components/auth/AuthForm";
import styles from "@styles/auth/auth-form.module.scss";

function SignIn() {
  return (
    <div className={styles.authWrapper}>
      <AuthForm mode="signin" />
    </div>
  );
}

export default SignIn;
