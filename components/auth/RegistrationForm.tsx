"use client";

import { register, signin } from "@/lib/api";
import Image from "next/image";
import React, { useCallback, useContext, useState } from "react";
import styles from "@styles/auth/auth-form.module.scss";
import { Button, TextField } from "@mui/material";
import CustomIcon from "../shared/custom-icon/CustomIcon";
import { UserContext } from "@/contexts/UserContext";
import { LoadingButton } from "@mui/lab";
import BasicLoader from "../shared/loaders/BasicLoader";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import Link from "next/link";
import Swal from "sweetalert2";
YupPassword(Yup);

const RegistrationForm = () => {
  const { login, isAuthenticated } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Podaj poprawny e-mail")
      .required("E-mail jest obowiązkowy")
      .max(512, "E-mail to maksimum 512 znaków."),
    username: Yup.string()
      .min(3, "Nazwa użytkownika powinna być długości conajmniej 3.")
      .required("Nazwa użytkownika jest obowiązkowa")
      .max(512, "Nazwa użytkownika to maksimum 512 znaków"),
    password: Yup.string()
      .min(8, "Hasło to minimum 8 znaków.")
      .max(512, "Hasło to maksimum 512 znaków.")
      .minNumbers(1, "Hasło musi zawierać minimum 1 cyfrę.")
      .minSymbols(1, "Hasło musi zawierać minimum 1 symbol.")
      .required("Hasło jest obowiązkowe."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Hasła muszą się zgadzać")
      .required("Powtórzenie hasła jest obowiązkowe"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const info = await register({
          email: values.email,
          username: values.username,
          password: values.password,
        });

        if (info.success === true) {
          Swal.fire({
            icon: "success",
            confirmButtonColor: "#0359a4",
            title: "Sukces",
            text: "Po kliknięciu w przycisk zostaniesz przeniesiony do formularza logowania. Zaloguj się, aby móc w pełni korzystać z serwisu.",

            confirmButtonText: "Ok",
          }).then((result) => {
            router.replace("/signin");
          });
        }
        if (info.error === "Username already taken") {
          setError("Użytkownik z taką nazwą już istnieje!");
        }
        if (info.error === "Email already taken") {
          setError("Ten e-mail jest już przypisany do innego konta!");
        }
      } catch (e) {
        setError("Nie udało się poprawnie zarejestrować.");
      } finally {
        formik.resetForm();
        setLoading(false);
      }
    },
  });

  return (
    <>
      {isAuthenticated === null ? (
        <div className={styles.loaderWrapper}>
          <BasicLoader />
        </div>
      ) : (
        <>
          {isAuthenticated === true ? (
            router.replace("/dashboard")
          ) : (
            <div className={styles.authForm}>
              <header className={styles.header}>
                <Image
                  src="/logo-dark.svg"
                  height={100}
                  width={128}
                  alt="Typograficzne logo Langimmersion"
                />
                <h2 className={styles.greeter}>Stwórz konto</h2>
              </header>
              <form onSubmit={formik.handleSubmit}>
                <div className={styles.inputsWrapper}>
                  <TextField
                    fullWidth
                    value={formik.values.email}
                    id="email"
                    label="Adres e-mail"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputLabelProps={{ required: false }}
                  />

                  <TextField
                    fullWidth
                    id="username"
                    label="Nazwa użytkownika"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    InputLabelProps={{ required: false }}
                  />

                  <TextField
                    fullWidth
                    InputLabelProps={{ required: false }}
                    id="password"
                    label="Wpisz hasło"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />

                  <TextField
                    fullWidth
                    InputLabelProps={{ required: false }}
                    id="passwordConfirmation"
                    label="Wpisz ponownie hasło"
                    type="password"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.passwordConfirmation &&
                      Boolean(formik.errors.passwordConfirmation)
                    }
                    helperText={
                      formik.touched.passwordConfirmation &&
                      formik.errors.passwordConfirmation
                    }
                  />
                </div>

                {error && (
                  <div className={styles.errorInfo}>
                    <CustomIcon
                      name="warning"
                      alt="Ikona ostrzegawcza"
                      color="red"
                      size={32}
                      weight="bold"
                      mirrored={false}
                    />
                    <span className={styles.errorText}>{error}</span>
                  </div>
                )}

                <div className={styles.formButtons}>
                  <Link href={"/signin"}>
                    <Button>Logowanie</Button>
                  </Link>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                  >
                    Zarejestruj się
                  </LoadingButton>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RegistrationForm;
