import { grate } from "./animation"
import { gsap } from "gsap";

const animationHome = () => {
    grate(1, 0.6, ".grate-1")

    gsap.timeline({
        repeat:0,
        delay:0.3
    }).from(".porfile-container", {
        duration: 0.1,
        backgroundColor: "#fff",
    }).to(".porfile-container", {
        duration: 0.1,
        backgroundColor: "transparent",
    }).to(".porfile-container", {
        duration: 0.1,
        backgroundColor: "#fff",
    }).to(".porfile-container", {
        duration: 0.1,
        backgroundColor: "transparent",
    })

    gsap.from(".click", {
        delay: 1.8,
        duration: 1,
        scale:0
    })

    gsap.from(".scroll", {
        delay: 1.5,
        duration: 0.2,
        opacity: 0,
    })
}

export default animationHome