let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

function closeNavbar() {
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

sections.forEach((section, index) => {
    if (index !== 0) {
        section.classList.add('hidden');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.classList.contains('mode')) {
            closeNavbar();
            return;
        }

        e.preventDefault();

        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        sections.forEach(section => section.classList.add('hidden'));

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.classList.remove('hidden');

        setTimeout(() => {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }, 50);

        closeNavbar();
    });
});

window.onscroll = () => {
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    closeNavbar();
}

document.querySelector('.mode').addEventListener('click', function (e) {
    e.preventDefault();
    document.documentElement.classList.toggle('light-mode');

    const modeIcon = document.querySelector('.mode i');
    if (document.documentElement.classList.contains('light-mode')) {
        modeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        modeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    closeNavbar();
});

document.addEventListener('DOMContentLoaded', function () {
    const handleAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const animationName = entry.target.getAttribute('data-animation');
                entry.target.style.animation = `${animationName} 1s ease-in-out forwards`;

                entry.target.classList.add('animated');
            }
        });
    };

    const observer = new IntersectionObserver(handleAnimation, {
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.heading, .home-content, .home-img, .education, .experience, .skills-container, .portfolio-container');

    animatedElements.forEach(element => observer.observe(element));
});
