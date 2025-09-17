// Navbar.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export function loadNavbar() {
  fetch("Navbar.html")
    .then(res => res.text())
    .then(data => {
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

      // ====== FIREBASE AUTH STATE ======
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        const loginLink = document.querySelector('a[href="Login.html"]');
        if (user) {
          // Replace Login link with user dropdown
          if (loginLink) {
            loginLink.parentElement.outerHTML = `
              <li class="dropdown user-dropdown">
                <a href="#" class="dropdown-toggle">👋 ${user.displayName || user.email} ▾</a>
                <ul class="dropdown-menu">
                  <li><a href="UserProfile.html">Profile</a></li>
                  <li><a href="#" id="logoutBtn">Logout</a></li>
                </ul>
              </li>
            `;
          }

          // Re-bind dropdown toggle
          document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
            toggle.addEventListener("click", e => {
              e.preventDefault();
              toggle.parentElement.classList.toggle("active");
            });
          });

          // ====== LOGOUT HANDLER ======
          const logoutBtn = document.getElementById("logoutBtn");
          if (logoutBtn) {
            logoutBtn.addEventListener("click", async (e) => {
              e.preventDefault();
              try {
                await signOut(auth);

                // Clear local/session storage to remove cached user data
                localStorage.clear();
                sessionStorage.clear();

                // Redirect to homepage
                window.location.href = "Homepage.html";
              } catch (err) {
                console.error("Logout failed:", err);
              }
            });
          }
        } else {
          // User is logged out → do nothing (Login/Register stays visible)
        }
      });
    })
    .catch(err => console.error("Error loading navbar:", err));
}
