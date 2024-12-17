"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".carousel-participant-item");
  const totalItems = items.length;
  const inner = document.querySelector(".carousel-participant-inner");

  let currentIndex = 0;
  let intervalId = null;

  const updateCarousel = () => {
    const slideCount = window.innerWidth >= 768 ? 3 : 1;
    const totalSlides = Math.ceil(totalItems / slideCount);
    const slideWidth = items[0].getBoundingClientRect().width + 20;
    const maxIndex = totalSlides - 1;
    currentIndex = (currentIndex + maxIndex + 1) % (maxIndex + 1);

    inner.style.transition = "transform 0.5s ease-in-out";
    inner.style.transform = `translateX(-${
      currentIndex * slideWidth * slideCount
    }px)`;

    const slideNumber = document.querySelector(".slide-number");
    slideNumber.innerHTML = `${
      (currentIndex + 1) * slideCount
    }<span style="color: rgba(49, 49, 49, 0.6);">/${totalItems}</span>`;

    items.forEach((item, index) => {
      item.classList.toggle(
        "active",
        index >= currentIndex * slideCount &&
          index < (currentIndex + 1) * slideCount
      );
    });
  };

  const nextSlide = () => {
    currentIndex++;
    updateCarousel();
  };

  const prevSlide = () => {
    currentIndex--;
    updateCarousel();
  };

  const prevButton = document.querySelector(
    ".carousel-control-participant.prev"
  );
  const nextButton = document.querySelector(
    ".carousel-control-participant.next"
  );

  prevButton.addEventListener("click", () => {
    prevSlide();
    stopAutoScroll();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
    stopAutoScroll();
  });

  const startAutoScroll = () => {
    intervalId = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalId);
  };

  startAutoScroll();

  const sliderContainer = document.querySelector(".carousel-participant");
  sliderContainer.addEventListener("mouseenter", () => {
    stopAutoScroll();
  });

  sliderContainer.addEventListener("mouseleave", () => {
    startAutoScroll();
  });

  window.addEventListener("resize", updateCarousel);

  updateCarousel();
});
