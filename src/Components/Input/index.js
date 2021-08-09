import { TextField } from "unform-material-ui";

export default function Input({
  name,
  mask,
  inputType,
  variant,
  className,
  ...rest
}) {
  return (
    <TextField
      name={name}
      variant="outlined"
      margin="normal"
      fullWidth
      shrink
      {...rest}
    />
  );
}
