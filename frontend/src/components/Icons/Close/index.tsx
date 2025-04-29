import { SvgIcon, useTheme } from "@mui/material";

const Close = () => {
  const theme = useTheme();

  return (
    <SvgIcon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18"
          stroke={theme.palette.text.primary}
          stroke-width="2"
          stroke-linecap="square"
          stroke-linejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke={theme.palette.text.primary}
          stroke-width="2"
          stroke-linecap="square"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};
export default Close;
