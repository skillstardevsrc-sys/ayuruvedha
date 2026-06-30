// script.js
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navbar scroll effect
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("backdrop-blur-xl");
            navbar.classList.remove("py-6");
            navbar.classList.add("py-3");
        } else {
            navbar.classList.remove("backdrop-blur-xl");
            navbar.classList.add("py-6");
            navbar.classList.remove("py-3");
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            if (mobileMenu.classList.contains("hidden")) {
                // Open menu
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("flex");
                // Trigger animation
                setTimeout(() => {
                    mobileMenu.classList.remove("opacity-0", "-translate-y-4");
                    mobileMenu.classList.add("opacity-100", "translate-y-0");
                }, 10);
            } else {
                // Close menu
                mobileMenu.classList.remove("opacity-100", "translate-y-0");
                mobileMenu.classList.add("opacity-0", "-translate-y-4");
                setTimeout(() => {
                    mobileMenu.classList.add("hidden");
                    mobileMenu.classList.remove("flex");
                }, 300); // match transition duration
            }
        });
    }

    // Handle Mobile Nav Link clicks with Lenis smooth scroll
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Close mobile menu
            mobileMenu.classList.remove("opacity-100", "translate-y-0");
            mobileMenu.classList.add("opacity-0", "-translate-y-4");
            setTimeout(() => {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("flex");
            }, 300);

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If element is pinned by ScrollTrigger, scroll to its pin-spacer wrapper instead
                const scrollTarget = targetElement.parentElement && targetElement.parentElement.classList.contains('pin-spacer') 
                    ? targetElement.parentElement 
                    : targetElement;
                lenis.scrollTo(scrollTarget);
            }
        });
    });

    // Hero Text Animation
    gsap.to(".hero-text", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
    });

    // Parallax Backgrounds
    gsap.utils.toArray('.parallax-bg').forEach((bg, i) => {
        const speed = bg.getAttribute('data-speed') || 0.5;
        gsap.to(bg, {
            yPercent: 30 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: bg.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Fade in text for each scene
    const allSections = gsap.utils.toArray("section");

    // Pin each section so the next one overlays it cleanly
    allSections.forEach((section, i) => {
        // Assign ascending z-index so the scrolling section is always visually ON TOP of the pinned one
        section.style.zIndex = i + 10;

        // Don't pin the last section so the footer can scroll normally
        if (i === allSections.length - 1) return;

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            pin: true,
            pinSpacing: false,
        });
    });

    const scenes = document.querySelectorAll(".scene");
    scenes.forEach((scene, index) => {
        if (index === 0) return; // Skip hero

        const content = scene.querySelector(".relative.z-20");
        if (content) {
            gsap.fromTo(content,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: scene,
                        start: "top 70%",
                        end: "top 30%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Animate Why Choose Us Content & Cards
    gsap.to(".wcu-content", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#why-choose-us",
            start: "top 70%",
        }
    });

    gsap.to(".wcu-card", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.2,
        scrollTrigger: {
            trigger: "#why-choose-us",
            start: "top 70%",
        }
    });

    // Animate Doctor cards
    gsap.to(".doctor-card", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#doctors",
            start: "top 70%",
        }
    });

    // Animate Testimonials
    gsap.from(".testimonial-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#testimonials",
            start: "top 70%",
        }
    });

    // Initialize Swiper for Testimonials
    const swiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Handle Nav Link clicks with Lenis smooth scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If element is pinned by ScrollTrigger, scroll to its pin-spacer wrapper instead
                const scrollTarget = targetElement.parentElement && targetElement.parentElement.classList.contains('pin-spacer') 
                    ? targetElement.parentElement 
                    : targetElement;
                lenis.scrollTo(scrollTarget);
            }
        });
    });

    // Start Journey Button Click
    const startJourneyBtn = document.getElementById('start-journey-btn');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', () => {
            const targetElement = document.querySelector('#scene2');
            if (targetElement) {
                const scrollTarget = targetElement.parentElement && targetElement.parentElement.classList.contains('pin-spacer') 
                    ? targetElement.parentElement 
                    : targetElement;
                lenis.scrollTo(scrollTarget);
            }
        });
    }

    // Doctor Modal Logic
    const doctorModal = document.getElementById('doctor-modal');
    const modalBackdrop = doctorModal.querySelector('.modal-backdrop');
    const modalContent = doctorModal.querySelector('.modal-content');
    const modalCloseBtn = doctorModal.querySelector('.modal-close');
    const bookBtns = document.querySelectorAll('.book-consult-btn, .doctor-card .h-80');

    bookBtns.forEach(btn => {
        btn.classList.add('cursor-pointer');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Get data from the card
            const card = btn.closest('.doctor-card');
            const imgSrc = card.querySelector('img').src;
            const name = card.querySelector('h3').innerText;
            const role = card.querySelectorAll('p')[0].innerText;
            const desc = card.querySelectorAll('p')[1].innerText;

            // Populate Modal
            document.getElementById('modal-img').src = imgSrc;
            document.getElementById('modal-name').innerText = name;
            document.getElementById('modal-role').innerText = role;
            document.getElementById('modal-desc').innerText = desc;

            // Show Modal and Animate
            doctorModal.classList.remove('hidden', 'pointer-events-none');
            doctorModal.classList.add('flex', 'pointer-events-auto');
            lenis.stop(); // Stop scrolling when modal is open

            gsap.to(modalBackdrop, { opacity: 1, duration: 0.3 });
            gsap.to(modalContent, {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.5)"
            });
        });
    });

    const closeModal = () => {
        gsap.to(modalBackdrop, { opacity: 0, duration: 0.3 });
        gsap.to(modalContent, {
            y: 50,
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                doctorModal.classList.add('hidden', 'pointer-events-none');
                doctorModal.classList.remove('flex', 'pointer-events-auto');
                lenis.start(); // Resume scrolling

                // Reset form button if it was clicked
                const modalSubmitBtn = doctorModal.querySelector('button[type="button"]');
                if (modalSubmitBtn) {
                    modalSubmitBtn.innerText = "Request Appointment";
                    modalSubmitBtn.classList.remove('bg-green-600', 'text-white');
                }
            }
        });
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Form success state handling for all forms
    document.querySelectorAll('form button[type="button"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const form = btn.closest('form');
            const inputs = form.querySelectorAll('input');
            let allFilled = true;

            inputs.forEach(input => {
                if (input.value.trim() === '') allFilled = false;
            });

            if (allFilled) {
                btn.innerText = "✓ Request Sent Successfully!";
                btn.classList.add('bg-green-600', 'text-white');
                inputs.forEach(input => input.value = '');
            } else {
                btn.innerText = "Please fill all fields";
                setTimeout(() => {
                    btn.innerText = btn.innerText.includes("Confirm") ? "Confirm Appointment" : "Request Appointment";
                }, 2000);
            }
        });
    });

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Set initial transform for GSAP to handle centering
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        gsap.set(cursorDot, { x: posX, y: posY });

        // Outline follows with slight delay
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    // Cursor Hover Effect on links and buttons
    const hoverElements = document.querySelectorAll('a, button, .cursor-pointer');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });

    // --- Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // --- Fireflies Generator ---
    const firefliesContainer = document.getElementById('fireflies-container');
    if (firefliesContainer) {
        const numFireflies = 40;
        for (let i = 0; i < numFireflies; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');

            // Random positioning and animation duration
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 5;

            firefly.style.left = `${posX}%`;
            firefly.style.top = `${posY}%`;
            firefly.style.animationDuration = `${duration}s`;
            firefly.style.animationDelay = `${delay}s`;

            firefliesContainer.appendChild(firefly);
        }
    }

    // Change nav links color when scrolling to contact section
    ScrollTrigger.create({
        trigger: "#contact",
        start: "top 80px",
        onEnter: () => {
            gsap.to(".nav-link", { color: "#FAF7F2", duration: 0.3 });
        },
        onLeaveBack: () => {
            gsap.to(".nav-link", { color: "#000000", duration: 0.3 });
        }
    });

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    // Refresh ScrollTrigger when all images/assets finish loading to prevent layout shifts
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});
