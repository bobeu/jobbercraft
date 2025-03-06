import { TextField, InputAdornment, Icon } from "@mui/material";
import { forwardRef } from "react";

const SearchTextField = forwardRef(
  function SearchTextField(props: import("@mui/material").TextFieldProps, ref: any) {
    const { InputProps, ...rest } = props;
    // console.log("InputProps", InputProps);
    return (
      <TextField
        ref={ref}
        placeholder="Search"
        InputProps={{
          ...InputProps,
          ...(!InputProps?.startAdornment && {
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }),
        }}
        {...rest}
      />
    );
  }
);

SearchTextField.defaultProps = {
  size: "medium",
};

export default SearchTextField;
