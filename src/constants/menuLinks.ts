import { TitleType } from "../enums/TitleType";

export const menuLinks = [
  { key: "Movies", link: `/search?type=${TitleType.Movie}` },
  { key: "TV Series", link: `/search?type=${TitleType.TvSeries}` },
];
