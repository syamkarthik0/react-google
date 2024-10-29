import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview.length > 100
            ? movie.overview.substring(0, 100) + "..."
            : movie.overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={`https://www.themoviedb.org/movie/${movie.id}`}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
