import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Box, Skeleton } from "@mui/material";

const ArticleCardSkeleton = () => {
  const { width } = useWindowDimensions();
  const assignWidth = () => {
    if (width < 576) {
      return 300;
    }
    if (width < 992) {
      return 320;
    }
    return 400;
  };
  return (
    <Skeleton
      width={assignWidth()}
      height="30em"
      sx={{ borderRadius: 10, margin: "-2em 0" }}
    />
  );
};
export default ArticleCardSkeleton;
