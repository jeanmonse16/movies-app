const domain = "http://localhost:3000";

export const getStudios = () => {
  return fetch(`${domain}/studios`).then((response) => {
    return response.json();
  });
};

export const getMovies = () => {
  return fetch(`${domain}/movies`).then((response) => {
    return response.json();
  });
};

export const transferMovie = async ({ movieId, studioId }) => {
  return fetch(`${domain}/movies/${movieId}/transfer`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studioId }),
  }).then((response) => {
    return response.json();
  });
};
