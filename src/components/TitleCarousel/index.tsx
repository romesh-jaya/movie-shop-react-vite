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

const arrowBtnStyles =
  "flex absolute top-11 translate-y-1/2 color-white hover-hover:hover:text-black text-2xl w-12 h-12 bg-black hover-hover:hover:bg-white rounded-full items-center justify-center border-2 border-solid border-gray-300 cursor-pointer";

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

  console.log("width", width);
  console.log("visibleSlidesAtATime", visibleSlidesAtATime);

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
      <div class="w-full text-base font-bold mb-4">{sectionTitle}</div>
      <CarouselProvider
        naturalSlideWidth={3}
        naturalSlideHeight={3}
        totalSlides={titles.length}
        visibleSlides={visibleSlidesAtATime}
        step={visibleSlidesAtATime}
        isIntrinsicHeight
      >
        <Slider>{renderSlides()}</Slider>
        <ButtonBack class={arrowBtnStyles + " left-0"}>
          <FontAwesomeIcon icon="angle-left" />
        </ButtonBack>
        <ButtonNext class={arrowBtnStyles + " right-0"}>
          <FontAwesomeIcon icon="angle-right" />
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
}
