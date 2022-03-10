import { TitleType } from "../../enums/TitleType";

export type Title = {
  genre: string[];
  imdbID: string;
  pGRating: string;
  title: string;
  type: TitleType;
  year: string;
  id: string;
  languages: string[];
  actors: string;
  mediaURL: string;
  plot: string;
  imdbRating: string;
};
