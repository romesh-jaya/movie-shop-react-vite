import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../axios";
import Button from "../../common/Button";
import Spinner from "../../common/Spinner/Spinner";
import { TitleType } from "../../enums/TitleType";
import { Title } from "../../types/Title";
import Layout from "../Layout";
import TitlePreview from "../TitlePreview";

const pageSize = 10;

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const { isLoading, error: authError } = useAuth0();
  const [queryExecuted, setQueryExecuted] = useState(false);
  const [titles, setTitles] = useState<Title[]>([]);
  const title = type === TitleType.Movie ? "Browse Movies" : "Browse TV Series";
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [currentResultOffset, setCurrentResultOffset] = useState(0);

  const isTitleTypeValid = () => {
    return type === TitleType.Movie || type === TitleType.TvSeries;
  };

  const errorText = !isTitleTypeValid()
    ? "Invalid title type"
    : loadingError
    ? "There was an error fetching data from server. Please contact Admin"
    : authError
    ? "There was an error with Authentication. Please contact Admin"
    : "";

  const onLoadMoreTitlesClicked = () => {
    const newOffset = currentResultOffset + pageSize;
    executeQuery(
      false, // Don't call setLoading(true) in this scenario
      newOffset
    );
    setCurrentResultOffset(newOffset);
  };

  const executeQuery = useCallback(
    async (setLoadingInComponent: boolean, queryOffset?: number) => {
      if (!isTitleTypeValid()) {
        return;
      }

      try {
        setLoadingInComponent && setLoading(true);
        !setLoadingInComponent && setLoadingButton(true);

        const offset = queryOffset ?? 0;
        if (offset === 0) {
          setCurrentResultOffset(0);
        }

        const response = await axios.get(
          `${import.meta.env.VITE_NODE_SERVER}/movies`,
          {
            params: {
              pageSize,
              currentPage: offset / pageSize,
              fetchDetailsFromOmdb: true,
              searchType: type,
            },
          }
        );

        if (offset > 0) {
          // Add the newly fetched movies to the current set
          setTitles((titles) => {
            const newArray = titles.slice();
            if (response.data.movies.movies) {
              newArray.push(...response.data.movies.movies);
            }
            return newArray;
          });
        } else {
          setTitles(response.data.movies.movies);
        }

        setResultCount(response.data.movies.movieCount[0].count);
        setQueryExecuted(true);
      } catch {
        setLoadingError(true);
        setQueryExecuted(true);
      } finally {
        setLoading(false);
        setLoadingButton(false);
      }
    },
    [type]
  );

  useEffect(() => {
    executeQuery(true);
  }, [type]);

  const renderContent = () => {
    return (
      <>
        <div class="w-full flex flex-wrap gap-4 my-4">
          <div class="flex w-full items-center mb-3">
            <div className="flex-1 text-3xl font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
              {title}
            </div>
            <div
              class="text-right cursor-pointer hover-hover:hover:text-link-hover active:text-link-hover"
              onClick={() => navigate("/")}
            >
              &#60;BACK
            </div>
          </div>
          {titles.map((title) => (
            <TitlePreview
              key={title.imdbID}
              title={title.title}
              year={title.year}
              mediaURL={title.mediaURL}
              type={title.type}
              imdbID={title.imdbID}
            />
          ))}
        </div>
        {resultCount > currentResultOffset + pageSize && (
          <div class="my-6">
            <Button disabled={loadingButton} onClick={onLoadMoreTitlesClicked}>
              {loadingButton && <Spinner />}
              Load more titles
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div class="grid place-items-center">
      <Layout loading={isLoading || loading} errorText={errorText}>
        {queryExecuted && renderContent()}
      </Layout>
    </div>
  );
};

export default Search;
