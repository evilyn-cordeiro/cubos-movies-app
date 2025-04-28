import { useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <footer
      style={{
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <p
        style={{
          padding: "0 20px",
          color: theme.palette.text.primary,
          fontWeight: 200,
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          maxWidth: "100%",
        }}
      >
        2025 © Todos os direitos reservados a{" "}
        <strong style={{ color: theme.palette.text.primary }}>
          Cubos Movies
        </strong>
      </p>
    </footer>
  );
}
