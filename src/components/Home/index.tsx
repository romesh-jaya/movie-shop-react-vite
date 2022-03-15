import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { fetchFeaturedTitles } from "../../redux/slices/titles/featured-titles/functions";
import HeroCarousel from "../HeroCarousel";
import Layout from "../Layout";
import TitleCarousel from "../TitleCarousel";

const Home = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error: authError, isAuthenticated, user } = useAuth0();
  const [carouselLoaded, setCarouselLoaded] = useState(false); // This is to prevent CLS of Featured titles
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

  useEffect(() => {
    user;
    if (!fetched && isAuthenticated) {
      dispatch(fetchFeaturedTitles());
    }
  }, [fetched, isAuthenticated]);

  const renderContent = () => {
    return (
      <>
        <HeroCarousel
          setCarouselLoaded={setCarouselLoaded}
          carouselLoaded={carouselLoaded}
        />
        {carouselLoaded && featuredTitles.length > 0 && (
          <TitleCarousel sectionTitle="Featured" titles={featuredTitles} />
        )}
      </>
    );
  };

  return (
    <div class="grid place-items-center">
      <Layout loading={isLoading || loadingData} errorText={errorText}>
        {renderContent()}
      </Layout>
    </div>
  );
};

export default Home;
