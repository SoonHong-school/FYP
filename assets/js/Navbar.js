// navbar.js
// ====== HAMBURGER MENU ======
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.innerHTML = navMenu.classList.contains("active") ? "&times;" : "&#9776;";
  });
}

// ====== DROPDOWN TOGGLE ======
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
dropdownToggles.forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggle.parentElement.classList.toggle("active");
  });
});
