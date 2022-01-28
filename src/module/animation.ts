import { gsap } from "gsap";

const grate = (duration:number, delay:number, element:string) => {
    gsap.timeline({
        repeat:0,
        delay:delay,
    })
    .to(element, {
        duration: duration,
        height: "100%",
        ease: "power1.in",
    })
}

export { grate }