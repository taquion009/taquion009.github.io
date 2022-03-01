import { gsap } from "gsap";
import { grate } from "./animation";

let repeat = 0;

const animationSkill = () => {
  if (repeat == 1) return;

  grate(1, 0.3, ".grate-3");
  gsap.to(".click", {
    duration: 1,
    scale: 1,
  });
  repeat++;
};

export default animationSkill;
