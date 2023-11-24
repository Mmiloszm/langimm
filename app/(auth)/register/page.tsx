import LoginForm from "@/components/auth/LoginForm";
import RegistrationForm from "@/components/auth/RegistrationForm";
import styles from "@/styles/auth/auth-form.module.scss";
function Register() {
  return (
    <div className={styles.authWrapper}>
      <title>LangImmersion | Zarejestruj się</title>
      <RegistrationForm />
    </div>
  );
}

export default Register;
