const header = () => {
  const toggle = () => {
    document.querySelector(".menu").classList.toggle("opened");
    document.querySelector(".container-menu").classList.toggle("active");
    document.body.classList.toggle("without-scroll");
  };

  document.querySelector(".menu").addEventListener("click", toggle);
  document.querySelectorAll(".container-menu a").forEach((el) => {
    el.addEventListener("click", toggle);
  });
};

export default header;
