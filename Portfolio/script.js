const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");
const sections = document.querySelectorAll("main section[id]");

lucide.createIcons();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
  lucide.createIcons();
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

themeToggle.addEventListener("click", (event) => {
  event.preventDefault();
  document.body.classList.toggle("warm-mode");
  themeToggle.innerHTML = `<i data-lucide="${document.body.classList.contains("warm-mode") ? "moon" : "sun"}"></i>`;
  lucide.createIcons();
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const selected = filter.dataset.filter;
    projects.forEach((project) => {
      project.classList.toggle(
        "is-hidden",
        selected !== "all" && project.dataset.category !== selected,
      );
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55%" },
);

sections.forEach((section) => sectionObserver.observe(section));
