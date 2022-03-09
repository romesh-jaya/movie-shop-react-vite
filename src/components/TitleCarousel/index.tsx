import { useEffect, useRef, useState, ReactElement } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

import { MovieLibrary } from "../../types/MovieLibrary";
import TitlePreview from "../TitlePreview";
import { screenXlPx } from "../../constants/appConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowWidth } from "@react-hook/window-size";
import { cssValue } from "../../utils/css";

const thumbnailGap = 20;

const arrowBtnStyles =
  "flex absolute w-8 h-8 md:w-12 md:h-12 top-28 md:top-32 translate-y-1/2 color-white hover-hover:hover:text-black active:text-black text-2xl bg-black hover-hover:hover:bg-white active:bg-white rounded-full items-center justify-center border-2 border-solid border-gray-300 cursor-pointer disabled:hidden";

interface IProps {
  sectionTitle: string;
  titles: MovieLibrary[];
}

export default function TitleCarousel(props: IProps) {
  const { sectionTitle, titles } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // get the thumbnailWidth dynamically from CSS variable
  const thumbnailWidth = parseInt(cssValue("--thumbnail-width"));
  const slideWidth = thumbnailWidth + thumbnailGap;
  const visibleSlidesAtATime = Math.floor(containerWidth / slideWidth);
  // note: I had to use Window width instead of parent container's width as the parent wouldn't shrink back when
  // shrinking the window
  const windowWidth = useWindowWidth();

  useEffect(() => {
    // use the same width constraints as for the container
    setContainerWidth(
      windowWidth > screenXlPx ? screenXlPx : windowWidth * (11 / 12)
    );
  }, [windowWidth]);

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
  return visibleSlidesAtATime > 0 ? (
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
        <Slider style={{ width: `${containerWidth}px` }}>
          {renderSlides()}
        </Slider>
        <ButtonBack class={arrowBtnStyles + " left-0"}>
          <FontAwesomeIcon icon="angle-left" />
        </ButtonBack>
        <ButtonNext class={arrowBtnStyles + " right-0"}>
          <FontAwesomeIcon icon="angle-right" />
        </ButtonNext>
      </CarouselProvider>
    </div>
  ) : null;
}
