import { grate } from "./animation";

let repeat = 0;

const animationContact = () => {
  if (repeat == 1) return;

  grate(1, 0.3, ".grate-5");

  repeat++;
};

export default animationContact;
