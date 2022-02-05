import { grate } from "./animation";
import { gsap } from "gsap";

const animationAbout = () => {
    let options: any = {
        root: null,
        rootMargin: '100px',
        threshold: 0.8,
    }
    
    new IntersectionObserver((entries, observer)=>{
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.8) {
                    grate(1, 0.3, ".grate-2")
    
                    // gsap.timeline({
                    //     repeat:0,
                    //     delay:0.1,
                    // }).to(".berserk-img", {
                    //     duration: 0.5,
                    //     x: "-100%",
                    //     opacity: 1,
                    // })
    
                    // gsap.set(".berserk-img", {
                    //     y: "-98%",
                    // })
    
                    gsap.timeline({
                        repeat:0,
                        delay:0.1,
                    }).to(".s2-content", {
                        duration: 0.3,
                        x: "0%",
                        opacity: 1,
                    })
    
                    // gsap.timeline({
                    //     repeat:0,
                    //     delay:0.2,
                    // }).to(".s2 canvas", {
                    //     duration: 0.5,
                    //     scale: 1,
                    //     opacity: 1,
                    // })
                }
            }   
          });
    }, options).observe(document.querySelector(".s2"));
}

export default animationAbout