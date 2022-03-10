import { TitleType } from "../../enums/TitleType";
import { portraitImage } from "../../constants/appConstants";

interface IProps {
  title: string;
  year: string;
  type: TitleType.Movie | TitleType.TvSeries;
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
    <div class="w-32 md:w-48 m-auto shrink-0">
      <div class="shrink-0 cursor-pointer hover-hover:hover:opacity-70 hover-hover:hover:outline-2 hover-hover:hover:outline-white hover-hover:hover:outline">
        <img
          src={mediaURL ?? portraitImage}
          alt={title}
          class="w-32 h-48 md:w-48 md:h-72"
        />
      </div>
      <div class="text-sm">
        <p class="mb-2 mt-1 whitespace-nowrap text-ellipsis overflow-hidden">
          {title}
        </p>
        <div class="flex">
          <div class="flex-1">{year}</div>
          <div class="rounded-sm border-[1px] border-solid border-white px-1">
            {type === TitleType.Movie ? "mov" : "tv"}
          </div>
        </div>
      </div>
    </div>
  );
}
