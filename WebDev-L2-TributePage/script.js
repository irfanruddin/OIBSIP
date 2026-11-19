document.addEventListener("DOMContentLoaded", () => {
  const sections = [...document.querySelectorAll("header[id], main section[id]")];
  const navigationLinks = [...document.querySelectorAll(".nav-links a")];
  const revealElements = [
    ...document.querySelectorAll(".section"),
    ...document.querySelectorAll(".timeline-item"),
    ...document.querySelectorAll(".achievement-card"),
  ];

  revealElements.forEach((element) => element.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

      if (!visibleSection) {
        return;
      }

      navigationLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${visibleSection.target.id}`,
        );
      });
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const backToTopButton = document.createElement("button");
  backToTopButton.className = "back-to-top";
  backToTopButton.type = "button";
  backToTopButton.setAttribute("aria-label", "Back to top");
  backToTopButton.textContent = "↑";
  document.body.append(backToTopButton);

  const updateBackToTopVisibility = () => {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", updateBackToTopVisibility, {
    passive: true,
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateBackToTopVisibility();
});