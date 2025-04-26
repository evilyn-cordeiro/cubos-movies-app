import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/movieRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
