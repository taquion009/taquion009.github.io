import { gsap } from "gsap";
import { grate } from "./animation";

const animationSkill = () => {
    let options: any = {
        root: null,
        rootMargin: '100px',
        threshold: 0.8,
    }
    
    gsap.set(".click", {
        x: "-50%",
        y: "-50%",
        scale: 0,
      })

    new IntersectionObserver((entries, observer)=>{
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.8) {
                    grate(1, 0.3, ".grate-3")
                      gsap.to(".click", {
                          duration: 1,
                          scale:1,
                          x: "-50%",
                          y: "-50%",
                      })  
                }
            }
          });
    }, options).observe(document.querySelector(".s3"));
}

export default animationSkill