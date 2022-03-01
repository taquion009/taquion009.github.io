import gravity from "./module/gravity";
import screenFull from "./module/screenFull";
import { setAnimation } from "./module/animation";
import backgroundHexagon from "./module/backgroundHexagon";
import carousel from "./module/carousel";
import header from "./module/header";
import loadImage from "./module/loadImage";
import observer from "./module/observer";
import chargingScreen from "./module/chargingScreen";
import sendEmail from "./module/sendEmail";
import "./main.scss";
import "./styles/animate.scss";
import "./styles/home.scss";
import "./styles/about.scss";
import "./styles/skill.scss";
import "./styles/work.scss";
import "./styles/contact.scss";
import "./styles/header.scss";
import "./styles/eclipse.scss";

const observeCanvas = {
  view: {
    gravity: true,
    backgroundHexagon: true,
  },
};
let observered = observer(observeCanvas);

window.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);

  loadImage(11).then((images) => {
    chargingScreen().then((isCharging) => {
      if (isCharging) {
        document
          .querySelectorAll(".section-container > section")
          .forEach((el) => {
            observered.observe(el);
          });
      }

      document.querySelector<HTMLElement>(".section-container").style.display =
        "block";

      document.querySelector<HTMLElement>("header").style.display = "flex";

      document.querySelector<HTMLElement>(".loader").style.display = "none";

      document.querySelector<HTMLElement>("body").style.overflow =
        "hidden scroll";
      gravity(null, images, observeCanvas);
      backgroundHexagon(observeCanvas);
      screenFull();
      setAnimation();
      carousel();
      header();
      sendEmail();
    });
  });
});
