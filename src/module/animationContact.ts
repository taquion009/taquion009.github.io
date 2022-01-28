import { grate } from "./animation";

const animationContact = () => {
    let options: any = {
        root: null,
        rootMargin: '100px',
        threshold: 0.8,
    }
    
    new IntersectionObserver((entries, observer)=>{
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.8) {
                    grate(1, 0.3, ".grate-5")
                }
            }
          });
    }, options).observe(document.querySelector(".s5"));
}

export default animationContact