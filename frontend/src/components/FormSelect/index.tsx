import {
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
} from "@mui/material";

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: () => void;
  options: { label: string; value: string }[];
  errorMessage?: string;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  errorMessage,
}: FormSelectProps) {
  return (
    <FormControl fullWidth error={!!errorMessage}>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={onChange} hiddenLabel>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
