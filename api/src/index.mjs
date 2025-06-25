import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getAllMoviesFromStudios } from "../src/helpers.mjs";
import {
  sony,
  warner,
  disney,
  movieAge,
  studiosMap,
} from "../constants/studio_constants.mjs";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(
    `[INFO] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
  );
  next();
});

app.get("/studios", function (req, res) {
  let disneyTemp = { ...disney };
  delete disneyTemp.movies;
  let warnerTemp = { ...warner };
  delete warnerTemp.movies;
  let sonyTemp = { ...sony };
  delete sonyTemp.movies;
  res.json([disneyTemp, warnerTemp, sonyTemp]);
});

app.get("/movies", function (req, res) {
  try {
    res.json(getAllMoviesFromStudios([disney, warner, sony]));
  } catch (e) {
    console.log(`[ERROR]:${new Date().toISOString()} - ${e.message}`);
    res.statusCode(500);
  }
});

app.get("/movieAge", function (req, res) {
  res.json(movieAge);
});

//TODO: 1 add the capability to sell the movie rights to another studio
app.post("/movies/:movieId/transfer", function (req, res) {
  try {
    if (!req.body.studioId) throw new Error("STUDIO_ID_IS_REQUIRED");

    if (isNaN(req.body.studioId)) throw new Error("STUDIO_ID_MUST_BE_A_NUMBER");

    if (studiosMap[req.body.studioId] === undefined)
      throw new Error("STUDIO_NOT_FOUND");

    const { movie, studio } = [disney, warner, sony].reduce(
      (selectedMovie, currentStudio) => {
        if (
          currentStudio.movies.some(
            (movie) => Number(movie.id) === Number(req.params.movieId)
          )
        ) {
          if (Number(currentStudio.id) === Number(req.body.studioId))
            throw new Error("MOVIE_IS_ALREADY_IN_TARGET_STUDIO");

          return {
            movie: currentStudio.movies.find(
              (movie) => Number(movie.id) === Number(req.params.movieId)
            ),
            studio: currentStudio,
          };
        } else return selectedMovie;
      },
      { movie: null, studio: null }
    );

    if (movie === null) throw new Error("MOVIE_NOT_FOUND");

    studio["movies"] = studio["movies"].filter(
      (studioMovie) => Number(movie.id) !== Number(studioMovie.id)
    );

    studiosMap[req.body.studioId].movies.push(movie);

    res.json({ message: "SUCCESSFUL_TRANSFER" });
  } catch (error) {
    if (error.message === "STUDIO_ID_IS_REQUIRED")
      res.status(400).send({ message: "STUDIO_ID_IS_REQUIRED" });
    else if (error.message === "STUDIO_ID_MUST_BE_A_NUMBER")
      res.status(400).send({ message: "STUDIO_ID_MUST_BE_A_NUMBER" });
    else if (error.message === "STUDIO_NOT_FOUND")
      res.status(404).send({ message: "STUDIO_NOT_FOUND" });
    else if (error.message === "MOVIE_NOT_FOUND")
      res.status(404).send({ message: "MOVIE_NOT_FOUND" });
    else if (error.message === "MOVIE_IS_ALREADY_IN_TARGET_STUDIO")
      res.status(400).send({ message: "MOVIE_IS_ALREADY_IN_TARGET_STUDIO" });
    else {
      console.log(`[ERROR]:${new Date().toISOString()} - ${e.message}`);
      res.statusCode(500);
    }
  }
});

// TODO: 2 Add logging capabilities into the movies-app

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
