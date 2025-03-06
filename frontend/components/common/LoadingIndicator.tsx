import { forwardRef } from "react";
import { CircularProgress } from "@mui/material";

const LoadingIndicator = forwardRef(
  function LoadingIndicator(props: import("@mui/material").CircularProgressProps, ref) {
    return <CircularProgress ref={ref} {...props} />;
  }
);

export default LoadingIndicator;
