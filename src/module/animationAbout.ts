import { grate } from "./animation";
import { gsap } from "gsap";

let repeat = 0;

const animationAbout = () => {
  if (repeat == 1) return;

  grate(1, 0.3, ".grate-2");

  gsap
    .timeline({
      repeat: 0,
      delay: 0.1,
    })
    .to(".s2-content", {
      duration: 0.3,
      x: "0%",
      opacity: 1,
    });

  gsap
    .timeline({
      repeat: 0,
      delay: 0.3,
    })
    .to(".porfile-container", {
      duration: 1.25,
      opacity: 1,
    });

  repeat++;
};

export default animationAbout;
