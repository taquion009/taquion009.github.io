import { grate } from "./animation";
import { gsap } from "gsap";

let repeat = 0;

const animationHome = () => {
  if (repeat == 1) return;

  grate(1, 0.6, ".grate-1");

  gsap.to(".s1 .scroll", {
    delay: 1.5,
    duration: 0.2,
    opacity: 1,
  });

  repeat++;
};

export default animationHome;
