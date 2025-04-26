import { Router } from "express";
import {
  listMovies,
  addOrEditMovie,
  getMovieDetails,
} from "../controllers/movieController";
import { authenticate } from "../middlewares/authenticate";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/", authenticate, listMovies);
router.post("/", authenticate, upload.single("file"), addOrEditMovie);
router.get("/:id", authenticate, getMovieDetails);

export default router;
