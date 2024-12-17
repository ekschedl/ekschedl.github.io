const menu = () => {
  const menuBtn = document.querySelector(".menu");
  const menu = document.querySelector("menu");
  const closeBtn = menu.querySelector(".close-btn");
  const menuItems = menu.querySelectorAll("ul > li > a");

  const handleMenu = () => {
    menu.classList.toggle("active-menu");
  };

  const handleClick = (event) => {
    const target = event.target;

    if (target.closest(".menu") === menuBtn) {
      handleMenu();
    } else if (target === closeBtn) {
      handleMenu();
    } else if (
      target.closest("menu") &&
      Array.from(menuItems).includes(target)
    ) {
      handleMenu();
    } else if (!target.closest("menu")) {
      menu.classList.remove("active-menu");
    }
  };

  document.addEventListener("click", handleClick);
};

export default menu;
