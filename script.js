(function(){

const slidesContainer = document.getElementById("slidesContainer");
const slides = document.querySelectorAll(".slide");
const slideCounter = document.getElementById("slideCounter");

let isScrolling = false;

/* detect active slide */
function getActiveSlideIndex(){
    const containerRect = slidesContainer.getBoundingClientRect();
    const containerLeft = containerRect.left;
    let activeIndex = 0;
    let minDistance = Infinity;
    
    slides.forEach((slide, index) => {
        const slideRect = slide.getBoundingClientRect();
        const distance = Math.abs(slideRect.left - containerLeft);
        if(distance < minDistance){
            minDistance = distance;
            activeIndex = index;
        }
    });
    return activeIndex;
}

/* update slide counter */
function updateCounter(){
    const activeIndex = getActiveSlideIndex();
    slideCounter.textContent = (activeIndex + 1) + " / " + slides.length;
}

/* go to slide */
function goToSlide(index){
    if(index < 0 || index >= slides.length) return;
    slides[index].scrollIntoView({
        behavior: "smooth",
        inline: "start"
    });
}

/* keyboard navigation */
document.addEventListener("keydown", (e) => {
    const activeIndex = getActiveSlideIndex();
    if(e.key === "ArrowRight"){
        goToSlide(activeIndex + 1);
    }
    if(e.key === "ArrowLeft"){
        goToSlide(activeIndex - 1);
    }
});

/* mouse wheel navigation */
slidesContainer.addEventListener("wheel", (e) => {
    if(isScrolling) return;
    isScrolling = true;
    const activeIndex = getActiveSlideIndex();
    if(e.deltaY > 0){
        goToSlide(activeIndex + 1);
    } else {
        goToSlide(activeIndex - 1);
    }
    setTimeout(() => {
        isScrolling = false;
    }, 600);
});

/* scroll listener - MODIFIED to check for ER slide */
slidesContainer.addEventListener("scroll", function(){
    requestAnimationFrame(updateCounter);
    checkERSlide(); // Check if we need to start ER animation
});

/* initial load */
window.addEventListener("load", function(){
    setTimeout(updateCounter, 100);
});

/* resize */
window.addEventListener("resize", function(){
    requestAnimationFrame(updateCounter);
});

/* ================================
   ER DIAGRAM ANIMATION CONTROLLER
================================ */

let erAnimationStarted = false;

function checkERSlide(){

    const erSlideIndex = 9; // Slide 10 (index starts at 0)
    const activeIndex = getActiveSlideIndex();

    if(activeIndex === erSlideIndex && !erAnimationStarted){
        erAnimationStarted = true;
        startERAnimation();
    }

}

function startERAnimation(){

    const step = document.getElementById('stepText-embed');
    const customer = document.getElementById('customer-embed');
    const order = document.getElementById('order-embed');
    const rel = document.getElementById('rel-embed');

    const a1 = document.getElementById('a1-embed');
    const a2 = document.getElementById('a2-embed');
    const a3 = document.getElementById('a3-embed');

    const b1 = document.getElementById('b1-embed');
    const b2 = document.getElementById('b2-embed');
    const b3 = document.getElementById('b3-embed');

    const l1 = document.getElementById('l1-embed');
    const l2 = document.getElementById('l2-embed');

    const c1 = document.getElementById('c1-embed');
    const c2 = document.getElementById('c2-embed');

    function show(el, delay){
        setTimeout(()=>{
            if(el) el.classList.add("show");
        }, delay);
    }

    setTimeout(()=> step.innerText = "① CUSTOMER", 800);
    show(customer,1500);

    setTimeout(()=> step.innerText = "② CUSTOMER attributes",3000);
    show(a1,3600);
    show(a2,4000);
    show(a3,4400);

    setTimeout(()=> step.innerText = "③ ORDER",5600);
    show(order,6300);

    setTimeout(()=> step.innerText = "④ ORDER attributes",7600);
    show(b1,8200);
    show(b2,8600);
    show(b3,9000);

    setTimeout(()=> step.innerText = "⑤ relationship",10400);
    show(rel,11000);

    setTimeout(()=>{
        step.innerText = "⑥ connect entities";

        if(l1){
            l1.classList.add("draw");
            l2.classList.add("draw");
        }

        if(customer) customer.classList.add("connected");
        if(order) order.classList.add("connected");

    },12500);

    setTimeout(()=> step.innerText = "⑦ cardinality 1:M",16000);
    show(c1,16500);
    show(c2,16500);

    setTimeout(()=> step.innerText = "ER DIAGRAM COMPLETE",18500);
}

})();
