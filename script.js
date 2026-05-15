document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const navLinks = document.querySelectorAll(".nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const sections = document.querySelectorAll(".section-anchor");
  const reveals = document.querySelectorAll(".reveal");

  const portfolioScroller = document.querySelector(".portfolio-row-moving");
  const projectCards = document.querySelectorAll(".project-card");

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Header scroll
  const handleHeaderScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll);

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    menuToggle.classList.toggle("open");
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.classList.remove("open");
    });
  });

  // Active nav
  const setActiveLink = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    [...navLinks, ...mobileLinks].forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
  };

  setActiveLink();
  window.addEventListener("scroll", setActiveLink);

  // Reveal
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px",
    }
  );

  reveals.forEach((element) => revealObserver.observe(element));

  // Portfolio drag desktop
  if (portfolioScroller) {
    portfolioScroller.addEventListener("mousedown", (e) => {
      isDown = true;
      portfolioScroller.classList.add("dragging");

      startX = e.pageX - portfolioScroller.offsetLeft;
      scrollLeft = portfolioScroller.scrollLeft;
    });

    portfolioScroller.addEventListener("mouseleave", () => {
      isDown = false;
      portfolioScroller.classList.remove("dragging");
    });

    portfolioScroller.addEventListener("mouseup", () => {
      isDown = false;
      portfolioScroller.classList.remove("dragging");
    });

    portfolioScroller.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - portfolioScroller.offsetLeft;
      const walk = (x - startX) * 1.4;

      portfolioScroller.scrollLeft = scrollLeft - walk;
    });
  }

  // Portfolio click mobile
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (window.innerWidth <= 640) {
        projectCards.forEach((item) => item.classList.remove("active"));
        card.classList.add("active");
      }
    });
  });
});
