import React, { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import MovieService from "../services/movie";
import { useAuth } from "./AuthContext";

interface Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
}

interface AddMovieDTO {
  title: string;
  description: string;
  genre: string;
}

interface IMoviceContext {
  movies: Movie[];

  getAllMovies: (userId: number) => Promise<Movie[]>;
  removeMovie: (movieId: number) => Promise<any>;
  addMovie: (data: AddMovieDTO) => Promise<void>;
}

const MovieContext = createContext<IMoviceContext>({} as IMoviceContext);

interface IMovieProvider {
  children: React.ReactNode;
}

export default function MovieProvider({ children }: IMovieProvider) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const getAllMovies = async (userId: number) => {
    const result = await MovieService.getAllMovies(userId);
    setMovies(result);

    return result;
  };

  const addMovie = async (data: AddMovieDTO) => {
    try {
      const addededMovie = await MovieService.store(data);

      setMovies((currentState) => [...currentState, addededMovie]);

      toast("Movie created", {
        type: "success",
      });
    } catch (error) {
      toast("Error when creating movie", {
        type: "error",
      });
    }
  };

  const removeMovie = async (movieId: number) => {
    try {
      await MovieService.delete(movieId);

      setMovies((currentState) =>
        currentState.filter((movie) => movie.id !== movieId)
      );

      toast("Movie deleted", {
        type: "success",
      });
    } catch (error) {}
  };

  return (
    <MovieContext.Provider
      value={{ movies, removeMovie, addMovie, getAllMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
}

const useMovie = () => {
  return useContext(MovieContext);
};

export { MovieProvider, useMovie };
