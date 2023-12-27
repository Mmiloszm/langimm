import { UserContext } from "@/contexts/UserContext";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { getTextsFromKnowledgeBase } from "@/lib/api";
import { Parser } from "@json2csv/plainjs";

type DownloadDialogPropsType = {
  open: boolean;
  handleClose: () => void;
};

type DownloadDialogParamsType = {
  languageId: string;
  format: "csv" | "json";
};

type ApiResponseType = {
  success: boolean;
  texts: {
    id: number;
    language_id: number;
    text: string;
    translation: string;
  }[];
  total_texts: number;
};

const DownloadDialog = ({ open, handleClose }: DownloadDialogPropsType) => {
  const [params, setParams] = useState<DownloadDialogParamsType>({
    languageId: "0",
    format: "csv",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useContext(UserContext);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setParams({ ...params, languageId: event.target.value });
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    setParams({ ...params, format: event.target.value as "csv" | "json" });
  };

  const handleWordsDownload = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const res: ApiResponseType = await getTextsFromKnowledgeBase(
          token,
          0,
          9999
        );
        if (res.success === true) {
          let data;
          const words = res.texts;

          if (params.languageId === "0") {
            data = words.map((word) => {
              return { text: word.text, translation: word.translation };
            });
          } else {
            const id = Number(params.languageId);
            data = words
              .filter((word) => word.language_id === id)
              .map((word) => {
                return { text: word.text, translation: word.translation };
              });
          }
          if (params.format === "json") {
            const jsonData = JSON.stringify(data);
            const blob = new Blob([jsonData], { type: "application/json" });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "texts.json";

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }
          if (params.format === "csv") {
            const parser = new Parser({});
            const csvData = parser.parse(data);
            const blob = new Blob([csvData], { type: "text/csv" });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "texts.csv";

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }
        }
      } catch (e) {
        Swal.fire({
          title: "Coś poszło nie tak!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      logout();
    }
    setIsLoading(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Eksport słówek</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.6em",
            padding: "20px 0",
          }}
        >
          <FormControl>
            <InputLabel id="select-language-label">Język</InputLabel>
            <Select
              labelId="select-language-label"
              id="select-language"
              value={params.languageId}
              label="Język"
              onChange={handleLanguageChange}
            >
              <MenuItem value={0}>wszystkie</MenuItem>
              <MenuItem value={1}>angielski</MenuItem>
              <MenuItem value={2}>niemiecki</MenuItem>
              <MenuItem value={3}>włoski</MenuItem>
              <MenuItem value={4}>hiszpański</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="select-format-label">Format</InputLabel>
            <Select
              labelId="select-format-label"
              id="select-format"
              value={params.format}
              label="Format"
              onChange={handleFormatChange}
            >
              <MenuItem value={"csv"}>csv</MenuItem>
              <MenuItem value={"json"}>json</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => handleClose()}>
          Anuluj
        </Button>
        <LoadingButton
          variant="contained"
          sx={{ backgroundColor: "#0583f2" }}
          loading={isLoading}
          onClick={() => handleWordsDownload()}
        >
          Eksport
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
export default DownloadDialog;
