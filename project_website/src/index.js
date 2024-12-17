import timer from "./modules/timer";
import menu from "./modules/menu";
import modal from "./modules/modal";
import calc from "./modules/calc";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import swiper from "./modules/swiper";
import sendForm from "./modules/sendForm";

timer("2025-04-21T21:36:00");
menu();
modal();
calc(100);
tabs();
slider();
swiper();
sendForm({
  formId: "form1",
  someElem: [
    {
      type: "block",
      id: "total",
    },
  ],
});

sendForm({
  formId: "form2",
  someElem: [
    {
      type: "block",
      id: "total",
    },
  ],
});

sendForm({
  formId: "form3",
  someElem: [
    {
      type: "block",
      id: "total",
    },
  ],
});
