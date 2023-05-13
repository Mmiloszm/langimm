"use client";
import styles from "@styles/dashboard/filters/filter.module.scss";
import { Skeleton } from "@mui/material";

const FilterSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      width={100}
      height={40}
      sx={{ margin: "0.35em 0" }}
    />
  );
};

export default FilterSkeleton;
