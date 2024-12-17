export const fadeIn = (element, duration = 500) => {
  const startOpacity = 0;
  animate({
    duration,
    timing: (timeFraction) => timeFraction,
    draw: (progress) => {
      element.style.opacity = startOpacity + progress * (1 - startOpacity);
    },
  });
};

export const fadeOut = (element, duration = 500) => {
  const startOpacity = 1;
  animate({
    duration,
    timing: (timeFraction) => timeFraction,
    draw: (progress) => {
      element.style.opacity = startOpacity - progress * startOpacity;
    },
    onComplete: () => {
      element.style.display = "none";
    },
  });
};

export const animate = (options) => {
  const { duration, timing, draw } = options;
  const start = performance.now();

  const animateFrame = (time) => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animateFrame);
    }
  };

  requestAnimationFrame(animateFrame);
};
