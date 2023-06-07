import AuthForm from "@/components/auth/AuthForm";
import styles from "@styles/auth/auth-form.module.scss";

function SignIn() {
  return (
    <div className={styles.authWrapper}>
      <title>LangImmersion | Zaloguj się</title>
      <AuthForm mode="signin" />
    </div>
  );
}

export default SignIn;
