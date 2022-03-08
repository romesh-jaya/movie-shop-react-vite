import { MovieType } from "../../enums/MovieType";
import { portraitImage } from "../../constants/appConstants";

interface IProps {
  title: string;
  year: string;
  type: MovieType.Movie | MovieType.TvSeries;
  mediaURL?: string;
  imdbID: string;
}

export default function TitlePreview(props: IProps) {
  const { title, year, type, mediaURL } = props;

  /*
  const onPosterClicked = () => {
    const id = imdbID + "-" + prettyUrl(title);
    router.push(
      {
        pathname: "/titles/[id]",
        query: { id },
      },
      `/titles/${id}`,
      { shallow: true }
    );
  };
  */

  return (
    <div class="w-48 m-auto shrink-0">
      <div class="shrink-0 cursor-pointer">
        <img
          src={mediaURL ?? portraitImage}
          alt={title}
          width={194}
          height={287}
        />
      </div>
      <div>
        <p class="text-base mb-2 mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </p>
        <div class="flex">
          <div class="flex-1">{year}</div>
          <div class="border-2 border-solid border-white">
            {type === MovieType.Movie ? "mov" : "tv"}
          </div>
        </div>
      </div>
    </div>
  );
}
