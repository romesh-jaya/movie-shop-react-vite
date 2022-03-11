import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { fetchFeaturedTitles } from "../../redux/slices/titles/featured-titles/functions";
import Layout from "../Layout";

const Search = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error: authError, isAuthenticated, user } = useAuth0();
  const {
    error: fetchError,
    value: featuredTitles,
    loading: loadingData,
    fetched,
  } = useAppSelector((state) => state.featuredTitles);
  const errorText = fetchError
    ? "There was an error fetching data from server. Please contact Admin"
    : authError
    ? "There was an error with Authentication. Please contact Admin"
    : "";

  console.log("featuredTitles", featuredTitles);

  useEffect(() => {
    user;
    if (!fetched && isAuthenticated) {
      dispatch(fetchFeaturedTitles());
    }
  }, [fetched, isAuthenticated]);

  const renderContent = () => {
    return <div></div>;
  };

  return (
    <div class="grid place-items-center">
      <Layout loading={isLoading || loadingData} errorText={errorText}>
        {renderContent()}
      </Layout>
    </div>
  );
};

export default Search;
