"use strict";

console.log("carousel_stages 4");

let currentIndex = 0;
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;

function updateCarousel() {
  const inner = document.querySelector(".carousel-inner");
  inner.style.transform = `translateX(-${currentIndex * 100}%)`;

  const dots = document.querySelectorAll(".dot");
  console.log(dots);
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  const prevButton = document.getElementById("prevBtn");
  const nextButton = document.getElementById("nextBtn");
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === totalItems - 1;
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

function nextSlide() {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
    updateCarousel();
  }
}

function goToSlide(index) {
  if (index >= 0 && index < totalItems) {
    currentIndex = index;
    updateCarousel();
  }
}

document.getElementById("prevBtn").addEventListener("click", prevSlide);
document.getElementById("nextBtn").addEventListener("click", nextSlide);

document.querySelectorAll(".dot").forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
});
