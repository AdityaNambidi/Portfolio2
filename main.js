import './style.css'

// COOL SCROLLING ANIMATION PART
document.addEventListener('mousemove', onMouseMove);

const l1 = document.getElementById("l1");
const l2 = document.getElementById("l2");
const l3 = document.getElementById("l3");
const l4 = document.getElementById("l4");
const title = document.getElementById("title");

const layers = [l4, l3, l2, l1]
const tiltSpeed = [10, 6, 3, 1]

function onMouseMove(e) {

    if (!!('ontouchstart' in window) )return;
    if (!isVisibe(title, 0)) return;

    let mousePos = [e.pageX, e.pageY];
    const center = [Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)]

    const dir = [(mousePos[0]-center[0])/center[0], (mousePos[1]-center[1])/center[1]]

    for (let i = 0; i < 2; i++) {
        if (dir[i] > 1) {
            dir[i] = 1;
        } else if (dir[i] < -1) {
            dir[i] = -1;
        }
    }

    for (let i = 0; i < 4; i++) {
        const l = layers[i];

        l.style.left =( (-dir[0] * (tiltSpeed[i]+1) * 10) - 15) + "px";
    }
    
}


window.addEventListener('scroll', onScroll);
let prevVal = 0;


// ON VISIBLE ANIMATIONS

gsap.fromTo(".title", {x: 500, opacity: 0}, {x: 0, opacity:1, duration: 1});

let divNamesToAnim = ["#container", ".arrows", ".projects-title", ".blob1", ".blob2"]
let divsToAnim = []
let notAnimated = [];

for (let i =0; i < divNamesToAnim.length; i++) {
    divsToAnim.push(document.querySelector(divNamesToAnim[i]));
    
    gsap.to(divsToAnim[i], {opacity: 0});

    notAnimated.push(true)
}

function onScroll() {

    if (isVisibe(l4, 0)) {

        let value = window.scrollY;

        if (value * 1.2 > 700) {
            return;
        }
    
        l1.style.top = value * 1.4 + 'px'
        l2.style.top = value * 0.7 + 'px'
        l3.style.top = value * 0.2 + 'px'
        title.style.left = value * 0.9 + 'px';
    }

    for (let i =0; i < divsToAnim.length; i++) {

        if (isVisibe(divsToAnim[i], 1) && notAnimated[i]) {
            gsap.fromTo(divNamesToAnim[i] , {x: 500, opacity: 0}, {x: 0, opacity:1, duration: 1});
            notAnimated[i] = false;
        }
    }

}


// EPIC TYPING ANIMATION
let words = ["Programmer", "Designer", "Developer", "Freelancer", "Maker", "Human"]
let i = 0;
let j = 0;
let add = true;
let animDiv = document.getElementById("text-anim");

function typeWord() {
    animDiv.innerHTML = animDiv.innerHTML.slice(0, -1);

    if (i == 0 && add) {
        animDiv.innerHTML = ""
    }

    if (add) {

        animDiv.innerHTML += words[j][i]+"|";
        
        i++;
    }
    
    if (!add) {
        animDiv.innerHTML = animDiv.innerHTML.slice(0, -1) + "|";
        i--;
    }

    if (i == words[j].length) {
        add = false;
        setTimeout(typeWord, 600);
        return;
    }

    if (!add && i==0) {
        add=true;
         i = 0;
        j++;

        if (j == words.length) {
            j = 0;
            
        }
    }

    setTimeout(typeWord, 100);
}


typeWord();


function isVisibe(element, type) {
    var bounding = element.getBoundingClientRect();

    if (type == 1) {
        return bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    }

    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        return true;
    } else {
        return false;
    }
}