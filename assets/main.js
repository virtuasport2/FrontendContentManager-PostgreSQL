document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // SLIDER
  // =========================
  const slides = document.querySelectorAll(".slide");
  const slideContainer = document.querySelector(".slide-container");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;
  const imagesToShow = 6;
  const totalSlides = slides.length;

  // =========================
  // LOGIN / LOGOUT
  // =========================
  const loginButton = document.querySelector(".login-btn");
  const logoutButton = document.querySelector(".logout-btn");

  const tokenCheck = localStorage.getItem("token");

  if (tokenCheck) {
    logoutButton.classList.remove("hidden");
    loginButton.classList.add("hidden");
  } else {
    logoutButton.classList.add("hidden");
    loginButton.classList.remove("hidden");
  }

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");

    if (window.LogWebSocket) {
      window.LogWebSocket.stop();
    }

    window.location.href = "/assets/auth/login.html";
  });

  loginButton.addEventListener("click", () => {
    window.location.href = "/assets/auth/login.html";
  });

  const token = localStorage.getItem("token");
  if (token && window.LogWebSocket) {
    window.LogWebSocket.start();
  }

  // =========================
  // CARD ROUTING (FIX IMPORTANTE)
  // =========================
  const CONFIG = window.__CONFIG__;

  const cards = document.querySelectorAll(".card[data-target]"); // FIX QUI

  cards.forEach((card) => {
    card.addEventListener("click", async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/assets/auth/login.html";
        return;
      }

      try {
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/assets/auth/login.html";
          return;
        }
      } catch (err) {
        console.error(err);
        window.location.href = "/assets/auth/login.html";
        return;
      }

      const target = card.dataset.target;

      window.location.href = `/assets/dashboard/${target}.html`;
    });
  });
});
