import { useEffect, useRef, useState, ReactElement } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

import { useContainerDimensions } from "../../hooks/useContainerDimensions";
import { MovieLibrary } from "../../types/MovieLibrary";
import TitlePreview from "../TitlePreview";
import { thumbnailWidth } from "../../constants/appConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const thumbnailGap = 20;
const slideWidth = thumbnailWidth + thumbnailGap;

interface IProps {
  sectionTitle: string;
  titles: MovieLibrary[];
}

export default function TitleCarousel(props: IProps) {
  const { sectionTitle, titles } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const visibleSlidesAtATime = Math.floor(containerWidth / slideWidth);
  const { width } = useContainerDimensions(containerRef);

  useEffect(() => {
    setContainerWidth(width);
  }, [width]);

  const renderSlides = () => {
    const slides: ReactElement[] = [];
    titles.forEach((movie, idx) => {
      slides.push(
        <Slide index={idx} key={movie.imdbID} class="!px-1 !py-0">
          <TitlePreview
            title={movie.title}
            year={movie.year}
            type={movie.type}
            imdbID={movie.imdbID}
          />
        </Slide>
      );
    });
    return slides;
  };

  // Note: naturalSlideWidth and naturalSlideHeight are ignored when isIntrinsicHeight is set
  return (
    <div class="w-full relative" ref={containerRef}>
      <div class="text-base font-bold mb-4">{sectionTitle}</div>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={10}
        totalSlides={titles.length}
        isIntrinsicHeight
        visibleSlides={visibleSlidesAtATime}
        step={visibleSlidesAtATime}
      >
        <Slider>{renderSlides()}</Slider>
        <ButtonBack className={"btn-arrow back-button"}>
          <FontAwesomeIcon icon="angle-left" />
        </ButtonBack>
        <ButtonNext className={"btn-arrow next-button"}>
          <FontAwesomeIcon icon="angle-right" />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
}
