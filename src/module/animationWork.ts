import { grate } from "./animation";
import { gsap } from "gsap";

let repeat = 0;

const animationWork = () => {
  if (repeat == 1) return;

  grate(1, 0.3, ".grate-4");

  gsap.to(".s4 .scroll", {
    delay: 1.5,
    duration: 0.2,
    opacity: 1,
  });

  repeat++;
};

export default animationWork;
