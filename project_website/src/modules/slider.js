const slider = () => {
  const sliderBlock = document.querySelector(".portfolio-content");
  const slides = document.querySelectorAll(".portfolio-item");
  const dotsContainer = document.querySelector(".portfolio-dots");
  const timeInterval = 2000;
  let currentSlide = 0;
  let interval;

  const createDots = () => {
    slides.forEach((slide, index) => {
      const dot = document.createElement("li");
      dot.classList.add("dot");
      dotsContainer.appendChild(dot);
      if (index === 0) {
        dot.classList.add("dot-active");
      }
    });
  };

  createDots();

  sliderBlock.appendChild(dotsContainer);

  const dots = document.querySelectorAll(".dot");

  const prevSlide = (elems, index, strClass) => {
    elems[index].classList.remove(strClass);
  };

  const nextSlide = (elems, index, strClass) => {
    elems[index].classList.add(strClass);
  };

  const activateDot = (index) => {
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("dot-active");
      } else {
        dot.classList.remove("dot-active");
      }
    });
  };

  const autoSlide = () => {
    prevSlide(slides, currentSlide, "portfolio-item-active");
    prevSlide(dots, currentSlide, "dot-active");
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    nextSlide(slides, currentSlide, "portfolio-item-active");
    activateDot(currentSlide);
  };

  const startSlide = () => {
    interval = setInterval(autoSlide, 2000);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  sliderBlock.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.matches(".dot, .portfolio-btn")) {
      return;
    }
    prevSlide(slides, currentSlide, "portfolio-item-active");
    prevSlide(dots, currentSlide, "dot-active");
    if (e.target.matches("#arrow-right")) {
      currentSlide++;
    } else if (e.target.matches("#arrow-left")) {
      currentSlide--;
    } else if (e.target.classList.contains("dot")) {
      dots.forEach((dot, index) => {
        if (e.target === dot) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    nextSlide(slides, currentSlide, "portfolio-item-active");
    activateDot(currentSlide); // Активируем соответствующую точку
  });

  sliderBlock.addEventListener(
    "mouseenter",
    (e) => {
      if (e.target.matches(".dot, .portfolio-btn")) {
        stopSlide();
      }
    },
    true
  );
  sliderBlock.addEventListener(
    "mouseleave",
    (e) => {
      if (e.target.matches(".dot, .portfolio-btn")) {
        startSlide();
      }
    },
    true
  );

  startSlide();
};

export default slider;
