import { Box, Button } from "@mui/material";
import FormInput from "../FormInput";

interface FilterValues {
  minDuration: string;
  maxDuration: string;
  startDate: string;
  endDate: string;
}

interface FilterModalProps {
  filters: FilterValues;
  onChange: (field: keyof FilterValues, value: string) => void;
  onClear: () => void;
  onApply: () => void;
}

const FilterModal = ({
  filters,
  onChange,
  onClear,
  onApply,
}: FilterModalProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "420px",
        width: "80%",
        bgcolor: "background.paper",
        p: 3,
        borderRadius: "4px",
        boxShadow: 24,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormInput
        label="Duração mínima (min)"
        placeholder="Ex: 90"
        type="number"
        value={filters.minDuration}
        onChange={(e) => onChange("minDuration", e.target.value)}
      />
      <FormInput
        label="Duração máxima (min)"
        placeholder="Ex: 150"
        type="number"
        value={filters.maxDuration}
        onChange={(e) => onChange("maxDuration", e.target.value)}
      />
      <FormInput
        label="Data Inicial"
        type="date"
        value={filters.startDate}
        onChange={(e) => onChange("startDate", e.target.value)}
      />
      <FormInput
        label="Data Final"
        type="date"
        value={filters.endDate}
        onChange={(e) => onChange("endDate", e.target.value)}
      />

      <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
        <Button variant="outlined" onClick={onClear}>
          Limpar
        </Button>
        <Button variant="contained" onClick={onApply}>
          Aplicar
        </Button>
      </Box>
    </Box>
  );
};

export default FilterModal;
