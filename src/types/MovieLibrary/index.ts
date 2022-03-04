import { MovieType } from "../../enums/MovieType";

export type MovieLibrary = {
  genre: string[];
  imdbID: string;
  pGRating: string;
  title: string;
  type: MovieType;
  year: string;
  id?: string;
  addedOn?: Date;
  count: number;
  languages: string[];
};
