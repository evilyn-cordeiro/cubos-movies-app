import { Router } from "express";
import {
  listMovies,
  addOrEditMovie,
  getMovieDetails,
  deleteMovie,
} from "../controllers/movieController";
import { authenticate } from "../middlewares/authenticate";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/", authenticate, listMovies);
router.post("/", authenticate, upload.single("file"), addOrEditMovie);
router.get("/:id", authenticate, getMovieDetails);
router.delete("/:id", authenticate, deleteMovie);

export default router;
