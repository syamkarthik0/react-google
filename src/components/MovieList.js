import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, CircularProgress } from "@mui/material";
import MovieCard from "./MovieCard";

const API_KEY = "49a5508b99e54cbf67438655e1565e32"; // Replace with your TMDB API Key
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data from TMDB", error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MovieList;
