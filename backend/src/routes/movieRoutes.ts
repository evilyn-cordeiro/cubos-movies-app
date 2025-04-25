import { Router } from "express";
import {
  listMovies,
  addOrEditMovie,
  getMovieDetails,
} from "../controllers/movieController";

const router = Router();

router.get("/", listMovies);
router.post("/", addOrEditMovie);
router.get("/:id", getMovieDetails);

export default router;
