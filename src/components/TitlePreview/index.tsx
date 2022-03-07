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
    <div className={"styles.container"}>
      <div className={"styles.poster"}>
        <img src={mediaURL ?? portraitImage} alt={title} />
      </div>
      <div>
        <p className={"styles.title"}>{title}</p>
        <div className="info-line">
          <div className={"styles.year"}>{year}</div>
          <div className={"styles.type"}>
            {type === MovieType.Movie ? "mov" : "tv"}
          </div>
        </div>
      </div>
    </div>
  );
}
