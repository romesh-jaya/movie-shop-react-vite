import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import axios from "../../axios";
import Button from "../../common/Button";
import Spinner from "../../common/Spinner/Spinner";
import { TitleType } from "../../enums/TitleType";
import { Title } from "../../types/Title";
import Layout from "../Layout";
import TitlePreview from "../TitlePreview";

const pageSize = 10;

const Search = () => {
  const { isLoading, error: authError } = useAuth0();
  const [queryExecuted, setQueryExecuted] = useState(false);
  const [titles, setTitles] = useState<Title[]>([]);
  //const resultForText = keyword ? "Result for: " + keyword : `Filter titles`;
  //const title = keyword || type ? titleBase + " - " + resultForText : "";
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [currentResultOffset, setCurrentResultOffset] = useState(0);
  //const [queryInput, setQueryInput] = useState("");

  const errorText = loadingError
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
              searchType: TitleType.Movie,
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
    []
  );

  useEffect(() => {
    executeQuery(true);
  }, []);

  const renderContent = () => {
    return (
      <>
        <div class="w-full flex flex-wrap gap-4 my-4">
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
