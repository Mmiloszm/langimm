import {
  ClickAwayListener,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Question } from "@phosphor-icons/react";
import { useState } from "react";
const TutorialPopup = () => {
  const [open, setOpen] = useState(false);
  const text =
    "1. Wybierz słowo początkowe i końcowe, fraza pomiędzy nimi będzie przetłumaczona.\n 2. Maksymalna długość frazy to 5 słów.\n 3. Frazy mogą być tylko w obrębie tego samego paragrafu.";

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <Typography fontSize={16}>
              <div style={{ whiteSpace: "pre-line" }}>{text}</div>
            </Typography>
          }
        >
          <IconButton onClick={handleTooltipOpen}>
            <Question size={36} color="#0359a4" />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};
export default TutorialPopup;
