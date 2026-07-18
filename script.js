/*====================================================
 AutoSeat Pro
 Premium Automotive Website
 script.js - Part 1
====================================================*/

/*==============================
LOADER
==============================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 1200);
    }

});

/*==============================
STICKY HEADER
==============================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});

/*==============================
SCROLL PROGRESS BAR
==============================*/

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (window.pageYOffset / totalHeight) * 100;

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

});

/*==============================
MOBILE MENU
==============================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.classList.toggle("bx-x");

    });

}

/*==============================
CLOSE MENU AFTER CLICK
==============================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuBtn) {
            menuBtn.classList.remove("bx-x");
        }

    });

});

/*==============================
SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            window.scrollTo({

                top: target.offsetTop - 70,

                behavior: "smooth"

            });

        }

    });

});

/*==============================
BACK TO TOP
==============================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*==============================
ACTIVE NAV LINK
==============================*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
/*====================================================
SCRIPT.JS - PART 2
Animated Counters, Gallery, Lightbox & Testimonials
====================================================*/

/*==============================
ANIMATED COUNTERS
==============================*/

const counters = document.querySelectorAll(".counter");

function runCounters() {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = target / 100;

        function updateCounter() {

            count += speed;

            if (count < target) {

                counter.textContent = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        updateCounter();

    });

}

let counterStarted = false;

window.addEventListener("scroll", () => {

    const stats = document.querySelector(".stats");

    if (!stats || counterStarted) return;

    const top = stats.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        counterStarted = true;

        runCounters();

    }

});

/*==============================
GALLERY FILTER
==============================*/

const filterButtons = document.querySelectorAll(".gallery-filter button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (filter === "all" || item.dataset.category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});

/*==============================
LIGHTBOX
==============================*/

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const img = item.querySelector("img");

        if (!img || !lightbox || !lightboxImg) return;

        lightbox.style.display = "flex";

        lightboxImg.src = img.src;

    });

});

if (closeLightbox && lightbox) {

    closeLightbox.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

}

if (lightbox) {

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}

/*==============================
TESTIMONIAL SLIDER
==============================*/

const testimonials = document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

function showTestimonial(index){

    testimonials.forEach(card=>card.classList.remove("active"));

    if(testimonials.length){

        testimonials[index].classList.add("active");

    }

}

if(testimonials.length){

    showTestimonial(0);

    setInterval(()=>{

        testimonialIndex++;

        if(testimonialIndex>=testimonials.length){

            testimonialIndex=0;

        }

        showTestimonial(testimonialIndex);

    },4000);

}

/*==============================
SCROLL REVEAL
==============================*/

const revealElements = document.querySelectorAll(
".service-card,.product-card,.feature-box,.gallery-item,.price-card,.about-card,.testimonial"
);

function revealOnScroll(){

    revealElements.forEach(el=>{

        const top = el.getBoundingClientRect().top;

        if(top < window.innerHeight-80){

            el.style.opacity="1";

            el.style.transform="translateY(0)";

        }

    });

}

revealElements.forEach(el=>{

    el.style.opacity="0";

    el.style.transform="translateY(50px)";

    el.style.transition=".7s ease";

});

window.addEventListener("scroll",revealOnScroll);

revealOnScroll();
/*====================================================
SCRIPT.JS - PART 3
Form Validation, Popup & Final Features
====================================================*/

/*==============================
CONTACT FORM
==============================*/

const contactForm = document.querySelector(".contact-form");
const successPopup = document.getElementById("successPopup");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = this.querySelector('input[name="name"]');
        const phone = this.querySelector('input[name="phone"]');
        const email = this.querySelector('input[name="email"]');
        const message = this.querySelector("textarea");

        if (name && name.value.trim().length < 2) {
            alert("Please enter your name.");
            return;
        }

        if (phone && !/^[6-9]\d{9}$/.test(phone.value.trim())) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (email && email.value.trim() !== "") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value.trim())) {
                alert("Please enter a valid email.");
                return;
            }
        }

        if (message && message.value.trim().length < 10) {
            alert("Please enter a message with at least 10 characters.");
            return;
        }

        if (successPopup) {
            successPopup.style.display = "flex";
        }

        contactForm.reset();

    });

}

/*==============================
CLOSE POPUP
==============================*/

const popupCloseBtn = document.querySelector("#successPopup button");

if (popupCloseBtn && successPopup) {

    popupCloseBtn.addEventListener("click", () => {

        successPopup.style.display = "none";

    });

}

if (successPopup) {

    successPopup.addEventListener("click", (e) => {

        if (e.target === successPopup) {
            successPopup.style.display = "none";
        }

    });

}

/*==============================
BUTTON RIPPLE EFFECT
==============================*/

document.querySelectorAll(".btn,.price-btn,.submit-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.width = ripple.style.height = "20px";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.5)";
        ripple.style.transform = "scale(0)";
        ripple.style.left = (e.clientX - rect.left - 10) + "px";
        ripple.style.top = (e.clientY - rect.top - 10) + "px";
        ripple.style.pointerEvents = "none";
        ripple.style.animation = "ripple .6s linear";

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

});

/*==============================
RIPPLE ANIMATION
==============================*/

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `
@keyframes ripple{
from{
transform:scale(0);
opacity:.8;
}
to{
transform:scale(12);
opacity:0;
}
}
`;

document.head.appendChild(rippleStyle);

/*==============================
CURRENT YEAR
==============================*/

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}

/*==============================
ESC KEY CLOSE LIGHTBOX
==============================*/

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        const lightbox = document.querySelector(".lightbox");

        if (lightbox) {
            lightbox.style.display = "none";
        }

        if (successPopup) {
            successPopup.style.display = "none";
        }

    }

});

/*==============================
LAZY LOADING IMAGES
==============================*/

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});

/*==============================
CONSOLE MESSAGE
==============================*/

console.log("%cAutoSeat Pro Website Loaded Successfully 🚗",
"color:#ff1f1f;font-size:18px;font-weight:bold;");