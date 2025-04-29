import { Box, Typography, useTheme } from "@mui/material";

interface InfoCardProps {
  label: string;
  value: string | number;
}
const InfoCard = ({ label, value }: InfoCardProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: 2,
        minWidth: "122px",
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.5)",
      }}
    >
      <Typography variant="h6">{label}</Typography>
      <Typography fontWeight="bold">{value}</Typography>
    </Box>
  );
};
export default InfoCard;
