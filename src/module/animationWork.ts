import { grate } from "./animation";

let repeat = 0;

const animationWork = () => {
  if (repeat == 1) return;

  grate(1, 0.3, ".grate-4");

  repeat++;
};

export default animationWork;
