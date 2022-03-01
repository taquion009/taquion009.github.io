import animationSkill from "../module/animationSkill";
import animationHome from "../module/animationHome";
import animationAbout from "../module/animationAbout";
import animationWork from "../module/animationWork";
import animationContact from "../module/animationContact";

const observer = (observeCanvas: { view: { [key: string]: boolean } }) => {
  let options: any = {
    root: null,
    rootMargin: "10px",
    threshold: 0.6,
  };

  return new IntersectionObserver((entries, observer) => {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (entry.intersectionRatio >= 0.6) {
          switch (entry.target.id) {
            case "home":
              animationHome();
              break;
            case "about":
              animationAbout();
              break;
            case "skills":
              animationSkill();
              break;
            case "contact":
              animationContact();
              break;
            case "work":
              animationWork();
              break;
          }
        }
        if (entry.intersectionRatio >= 0.1) {
          switch (entry.target.id) {
            case "home":
              observeCanvas.view.gravity = false;
              observeCanvas.view.backgroundHexagon = true;
              break;
            case "skills":
              observeCanvas.view.gravity = true;
              observeCanvas.view.backgroundHexagon = false;
              break;
            default:
              observeCanvas.view.gravity = false;
              observeCanvas.view.backgroundHexagon = false;
              break;
          }
        }
      }
    });
  }, options);
};

export default observer;
