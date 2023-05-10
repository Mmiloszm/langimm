"use client";
import styles from "@styles/dashboard/filters/sort.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const Sort = () => {
  const [sort, setSort] = useState("newest");
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  return (
    <div className={styles.selectWrapper}>
      <FormControl size="small">
        <InputLabel id="select-sort">Sortuj</InputLabel>
        <Select
          labelId="select-sort"
          id="select"
          value={sort}
          label="Sortuj"
          onChange={handleChange}
        >
          <MenuItem value="newest">Nowości</MenuItem>
          <MenuItem value="categories">Kategorie</MenuItem>
          <MenuItem value="difficulty">Trudność</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default Sort;
