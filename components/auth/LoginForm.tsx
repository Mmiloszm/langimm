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
import Link from "next/link";
import Swal from "sweetalert2";

const loginContent = {
  url: "/signin",
  header: "Witaj z powrotem",
  secondaryButton: "Utwórz konto",
  primaryButton: "Zaloguj się",
};

const initial = { username: "", password: "" };

const LoginForm = () => {
  const { login, isAuthenticated } = useContext(UserContext);
  const [formState, setFormState] = useState({ ...initial });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const loginBody = {
          username: formState.username,
          password: formState.password,
        };
        const info = await signin(loginBody);

        if (info.refresh && info.access) {
          login({ refresh: info.refresh, access: info.access });
          router.replace("/dashboard");
        } else if (!info.success) {
          Swal.fire({
            icon: "error",
            title: "Nieprawidłowy login lub hasło",
          });
          setError("Nie udało się poprawnie zalogować.");
        }
      } catch (e) {
        setError("Nie udało się poprawnie zalogować");
      } finally {
        setFormState({ ...initial });
        setLoading(false);
      }
    },
    [formState, login, router]
  );

  const content = loginContent;

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
                  alt="typograficzne logo Langimmersion"
                />
                <h2 className={styles.greeter}>{content.header}</h2>
              </header>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputsWrapper}>
                  <TextField
                    value={formState.username}
                    id="outlined-username"
                    label="Nazwa użytkownika"
                    required
                    type="text"
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, username: e.target.value }))
                    }
                    InputLabelProps={{ required: false }}
                  />
                  <div className={styles.hintInput}>
                    <TextField
                      value={formState.password}
                      InputLabelProps={{ required: false }}
                      onChange={(e) =>
                        setFormState((s) => ({
                          ...s,
                          password: e.target.value,
                        }))
                      }
                      required
                      id="outlined-password-input"
                      label="Wpisz hasło"
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                {error && (
                  <div className={styles.errorInfo}>
                    <CustomIcon
                      name="warning"
                      alt="ikona ostrzegawcza"
                      color="red"
                      size={32}
                      weight="bold"
                      mirrored={false}
                    />
                    <span className={styles.errorText}>{error}</span>
                  </div>
                )}

                <div className={styles.formButtons}>
                  <Link href="/register">
                    <Button>{content.secondaryButton}</Button>
                  </Link>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                  >
                    {content.primaryButton}
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

export default LoginForm;
