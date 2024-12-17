import Swiper from "swiper";
import { Pagination } from "swiper/modules";

const swiper = () => {
  const swiper = new Swiper(".swiper", {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    breakpoints: {
      "@0.00": {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      "@0.75": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      "@1.50": {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
  });
};
export default swiper;
