import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../../common/Spinner/Spinner";
import HeroCarousel from "../HeroCarousel";

const Home = () => {
  const { isLoading, error } = useAuth0();
  let renderContent;

  if (isLoading) {
    renderContent = <Spinner />;
  } else if (error) {
    renderContent = <p class="text-red">{error}</p>;
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
