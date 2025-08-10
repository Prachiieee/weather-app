import { gsap } from "gsap";

export const animateSearchBarClick = (searchInputRef) => {
  if (!searchInputRef?.current) return;

  gsap.fromTo(
    searchInputRef.current,
    { scale: 1 },
    {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    }
  );
};

export const animateWeather = (weatherIconRef, forecastRef) => {
  if (!weatherIconRef?.current || !forecastRef?.current) return;

  gsap.fromTo(
    weatherIconRef.current,
    { scale: 0, rotation: -180, opacity: 0 },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    }
  );

  gsap.fromTo(
    forecastRef.current.children,
    { x: 150, opacity: 0, rotate: -5 },
    {
      x: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.8,
      stagger: {
        each: 0.15,
        from: "start",
      },
      ease: "back.out(1.7)",
    }
  );
};
