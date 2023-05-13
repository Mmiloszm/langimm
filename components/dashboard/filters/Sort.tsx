"use client";
import styles from "@styles/dashboard/filters/sort.module.scss";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Sort = ({
  handleSortChange,
  sort,
}: {
  handleSortChange: (event: SelectChangeEvent) => void;
  sort: string;
}) => {
  return (
    <div className={styles.selectWrapper}>
      <span className={styles.text}>Sortuj:</span>
      <FormControl size="small">
        <Select
          labelId="select-sort"
          id="select"
          value={sort}
          onChange={handleSortChange}
          sx={{
            fontWeight: "medium",
            textTransform: "none",
            color: "primary.dark",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.dark",
            },
            "& .MuiSvgIcon-root": {
              color: "primary.dark",
            },
          }}
        >
          <MenuItem value="newest">Nowości</MenuItem>

          <MenuItem value="nearest_difficulty">Trudność</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default Sort;
