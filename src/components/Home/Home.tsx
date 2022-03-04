import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Spinner from "../../common/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../redux";
import { fetchFeaturedTitles } from "../../redux/slices/titles/featured-titles/functions";
import HeroCarousel from "../HeroCarousel";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error: authError, isAuthenticated, user } = useAuth0();
  const {
    error: fetchError,
    value,
    loading: loadingData,
    fetched,
  } = useAppSelector((state) => state.featuredTitles);
  let renderContent;

  useEffect(() => {
    user;
    if (!fetched && isAuthenticated) {
      dispatch(fetchFeaturedTitles());
    }
  }, [fetched, isAuthenticated]);

  console.log("data", value);

  if (isLoading || loadingData) {
    renderContent = <Spinner />;
  } else if (authError) {
    renderContent = (
      <p class="text-red text-center">
        There was an error with Authentication. Please contact Admin
      </p>
    );
  } else if (fetchError) {
    renderContent = (
      <p class="text-red text-center">
        There was an error fetching data from server. Please contact Admin
      </p>
    );
  } else {
    renderContent = (
      <div>
        <HeroCarousel />
      </div>
    );
  }

  return <div class="grid place-items-center">{renderContent}</div>;
};

export default Home;
