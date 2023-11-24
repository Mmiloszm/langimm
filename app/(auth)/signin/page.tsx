import LoginForm from "@/components/auth/LoginForm";
import styles from "@styles/auth/auth-form.module.scss";

function SignIn() {
  return (
    <div className={styles.authWrapper}>
      <title>LangImmersion | Zaloguj się</title>
      <LoginForm />
    </div>
  );
}

export default SignIn;
