import { ReactElement } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";

const slideImages = [
  "/images/hero-1.webp",
  "/images/hero-2.webp",
  "/images/hero-3.webp",
];

export default function HeroCarousel() {
  const renderSlides = () => {
    const slides: ReactElement[] = [];
    slideImages.forEach((image, idx) => {
      slides.push(
        <Slide index={idx} key={image}>
          <img
            class="w-full"
            src={image}
            alt={`Ultra movies - your best collection of DVD's`}
          />
        </Slide>
      );
    });
    return slides;
  };

  return (
    <div class="relative mb-5">
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
      </CarouselProvider>
      <div class="max-w-screen-xl w-11/12 absolute bottom-10 left-0 right-0 mx-auto text-lg md:text-3xl text-center font-['Amatic_SC']">
        Ultra - Your one-stop destination for DVD&#39;s!
      </div>
    </div>
  );
}
