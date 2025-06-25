import { GENRE_STRING, sonyImages } from "../constants/studio_constants.mjs";

export const getMovie = (movieId, studios) => {
  let movie;
  let studio = studios.find((t) => {
    movie = t.movies.find((p) => p.id === movieId);
    return movie;
  });
  if (movie && studio) {
    return { movie, studioId: studio.id };
  }

  return false;
};

export const getAllMoviesFromStudios = (studios) => {
  let allMovies = [];
  studios.forEach((singleStudio) => {
    singleStudio.movies.map((movie) => {
      allMovies.push(movieConstructor(movie, singleStudio));
    });
  });
  return allMovies;
};

export const movieConstructor = (movie, studio) => {
  //Set url property to img
  if (movie.url) {
    Object.defineProperty(
      movie,
      "img",
      Object.getOwnPropertyDescriptor(movie, "url")
    );
    delete movie["url"];
  }

  if (Number(studio.id) === 3) movie.img = sonyImages[movie.id];

  Object.defineProperty(
    movie,
    "genreName",
    Object.getOwnPropertyDescriptor(GENRE_STRING, movie.genre)
  );

  //Add studioId from parent object
  Object.defineProperty(
    movie,
    "studioId",
    Object.getOwnPropertyDescriptor(studio, "id")
  );

  return movie;
};
