import { ReactElement, useEffect, useRef } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { useHeight } from "../../hooks/useHeight";

const slideImages = [
  "/images/hero-1.webp",
  "/images/hero-2.webp",
  "/images/hero-3.webp",
];

interface IProps {
  setCarouselLoaded: (loaded: boolean) => void;
  carouselLoaded: boolean;
}

export default function HeroCarousel(props: IProps) {
  const { setCarouselLoaded, carouselLoaded } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const containerHeight = useHeight(containerRef); // This is to prevent CLS of the text

  useEffect(() => {
    if (!carouselLoaded && containerHeight > 0) {
      setCarouselLoaded(true);
    }
  }, [containerHeight]);

  const renderSlides = () => {
    const slides: ReactElement[] = [];
    slideImages.forEach((image, idx) => {
      slides.push(
        <Slide index={idx} key={image}>
          <img
            class="w-full"
            src={image}
            alt="Ultra movies - your best collection of DVD's"
          />
        </Slide>
      );
    });
    return slides;
  };

  return (
    <div class="relative mb-5" ref={containerRef}>
      <CarouselProvider
        naturalSlideWidth={10}
        naturalSlideHeight={10}
        totalSlides={3}
        isIntrinsicHeight
        visibleSlides={1}
        isPlaying
        infinite
        interval={3000}
        step={1}
      >
        <Slider>{renderSlides()}</Slider>
        {containerHeight > 0 && (
          <div class="w-full absolute bottom-10 left-0 right-0 mx-auto text-lg md:text-3xl text-center font-['Amatic_SC']">
            Ultra - Your one-stop destination for DVD&#39;s!
          </div>
        )}
      </CarouselProvider>
    </div>
  );
}
