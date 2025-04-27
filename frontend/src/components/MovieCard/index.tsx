import { Box, Typography } from "@mui/material";

interface MovieCardProps {
  title: string;
  genres: string;
  posterUrl?: string;
}

export const MovieCard = ({ title, genres, posterUrl }: MovieCardProps) => {
  return (
    <Box
      sx={{
        width: 255,
        height: 355,
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: 3,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
        },
        bgcolor: "background.paper",
      }}
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
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.7)",
          p: 1,
          textAlign: "center",
          transition: "height 0.3s",
          height: "auto",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            opacity: 0,
            maxHeight: 0,
            overflow: "hidden",
            transition: "opacity 0.3s, max-height 0.3s",
          }}
          className="genre-hover"
        >
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            {genres}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
