import { Box, Typography } from "@mui/material";

interface MovieCardProps {
  title: string;
  genres: string;
  posterUrl?: string;
}

const MovieCard = ({ title, genres, posterUrl }: MovieCardProps) => {
  return (
    <Box
      sx={(theme) => ({
        width: "235px",
        maxHeight: "355px",
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          "& .genre-hover": {
            opacity: 1,
            maxHeight: 100,
          },
        },
        bgcolor: "background.paper",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 2px 8px rgba(255, 255, 255, 0.08)"
            : "0px 2px 8px rgba(0, 0, 0, 0.1)",
        mx: "auto",

        [theme.breakpoints.down("sm")]: {
          width: "183px",
          height: "281px",
        },
      })}
    >
      <Box
        component="img"
        src={posterUrl || "src/assets/movie-default.png"}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Box
        sx={(theme) => ({
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          px: 1,
          pt: 6,
          pb: 2,
          textAlign: "center",
          padding: "16px",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(to top, #000000, rgba(0,0,0,0))"
              : "linear-gradient(to top, rgba(81, 81, 81, 0.698), rgba(0,0,0,0))",
        })}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            textAlign: "start",
            lineHeight: 1,
          }}
        >
          {title}
        </Typography>

        <Box
          className="genre-hover"
          sx={{
            opacity: 0,
            maxHeight: 0,
            overflow: "hidden",
            transition: "opacity 0.3s, max-height 0.3s",
            textAlign: "start",
          }}
        >
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            {genres}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default MovieCard;
