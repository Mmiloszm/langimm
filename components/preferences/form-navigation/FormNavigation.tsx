import CustomIcon from "@/components/shared/custom-icon/CustomIcon";
import Button from "@mui/material/Button";
import styles from "@styles/preferences/form-navigation/form-navigation.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { FormType } from "../PreferencesForm";
import { PreferencesType } from "@/types/Preferences";
import { updatePreferences } from "@/lib/api";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";

type FormNavigationPropsType = {
  canGoFurther: boolean;
  form: FormType;
  setForm: Dispatch<SetStateAction<FormType>>;
  preferences?: PreferencesType;
};

const FormNavigation = ({
  canGoFurther,
  form,
  setForm,
  preferences,
}: FormNavigationPropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const changeForm = (action: "back" | "forward") => {
    if (form === "languages") {
      if (action === "forward") {
        setForm("difficulty");
      }
    }
    if (form === "difficulty") {
      if (action === "back") {
        setForm("languages");
      }
      if (action === "forward") {
        setForm("topics");
      }
    }
    if (form === "topics") {
      if (action === "back") {
        setForm("difficulty");
      }
      if (action === "forward") {
        submitForm();
      }
    }
  };

  const submitForm = async () => {
    const token = localStorage.getItem("access");
    if (token && preferences) {
      setIsLoading(true);
      const res = await updatePreferences(token, preferences);
      if (res.success === true) {
        setIsLoading(false);
        router.push("/dashboard");
      }
    }
  };
  return (
    <div className={styles.buttonsWrapper}>
      <Button
        color="primary"
        disabled={form === "languages"}
        size="large"
        variant="contained"
        startIcon={<CustomIcon name="arrowback" weight="bold" size={24} />}
        onClick={() => changeForm("back")}
      >
        Poprzednia
      </Button>

      <LoadingButton
        variant="contained"
        color="primary"
        loading={isLoading}
        size="large"
        disabled={canGoFurther}
        endIcon={<CustomIcon name="arrowforward" weight="bold" size={24} />}
        onClick={() => changeForm("forward")}
      >
        {form === "topics" ? "Zapisz" : "Następna"}
      </LoadingButton>
    </div>
  );
};
export default FormNavigation;
