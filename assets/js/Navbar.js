// Navbar.js
export function loadNavbar() {
  fetch("Navbar.html")
    .then(res => res.text())
    .then(data => {
      // Insert the navbar HTML into the placeholder
      document.getElementById("navbar").innerHTML = data;

      // ====== HAMBURGER MENU ======
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("nav-menu");

      if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
          navMenu.classList.toggle("active");
          hamburger.innerHTML = navMenu.classList.contains("active")
            ? "&times;"
            : "&#9776;";
        });
      }

      // ====== DROPDOWN TOGGLE ======
      document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
        toggle.addEventListener("click", e => {
          e.preventDefault();
          toggle.parentElement.classList.toggle("active");
        });
      });

      // ====== LOGIN STATE CHECK ======
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userName = localStorage.getItem("userName");

      if (isLoggedIn === "true" && userName) {
        const loginLink = document.querySelector('a[href="Login.html"]');
        if (loginLink) {
          loginLink.parentElement.outerHTML = `
            <li class="dropdown user-dropdown">
              <a href="#" class="dropdown-toggle">👋 ${userName} ▾</a>
              <ul class="dropdown-menu">
                <li><a href="UserProfile.html">Profile</a></li>
                <li><a href="#" id="logoutBtn">Logout</a></li>
              </ul>
            </li>
          `;
        }

        // Re-bind dropdown toggle for the new user menu
        document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
          toggle.addEventListener("click", e => {
            e.preventDefault();
            toggle.parentElement.classList.toggle("active");
          });
        });

        // Logout button event
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", e => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userName");
            window.location.href = "Homepage.html";
          });
        }
      }
    })
    .catch(err => console.error("Error loading navbar:", err));
}
