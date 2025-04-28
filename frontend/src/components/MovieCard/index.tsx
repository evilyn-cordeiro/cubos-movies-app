import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  genre: string;
  popularity?: number;
  posterUrl?: string;
}

const MovieCard = ({
  id,
  title,
  genre,
  posterUrl,
  popularity,
}: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={(theme) => ({
        width: { xs: "100%", sm: "235px" },
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
          "& .popularity-hover": {
            opacity: 1,
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

      {popularity !== undefined && (
        <Box
          className="popularity-hover"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "140px",
            height: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s",
            zIndex: 2,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={popularity}
            size={140}
            thickness={2}
            sx={{
              color: "#FFE000",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              backdropFilter: "blur(3px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {`${Math.round(popularity)}%`}
            </Typography>
          </Box>
        </Box>
      )}

      <Box
        sx={(theme) => ({
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          px: 1,
          pt: 6,
          pb: 2,
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            {genre}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieCard;
