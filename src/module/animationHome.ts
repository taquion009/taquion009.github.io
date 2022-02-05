import { grate } from "./animation"
import { gsap } from "gsap";

const animationHome = () => {
    grate(1, 0.6, ".grate-1")

    gsap.from(".scroll", {
        delay: 1.5,
        duration: 0.2,
        opacity: 0,
    })
}

export default animationHome