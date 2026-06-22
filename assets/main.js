document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const slideContainer = document.querySelector(".slide-container"); // Assicurati che il selettore sia corretto
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  const loginButton = document.querySelector(".login-btn");
  const logoutButton = document.querySelector(".logout-btn");

  let currentIndex = 0;
  const imagesToShow = 6; // Numero di immagini visibili alla volta
  const totalSlides = slides.length; // Numero totale delle immagini

  const token = localStorage.getItem("token");
  if (token) {
    logoutButton.classList.remove("hidden");
    loginButton.classList.add("hidden");
  } else {
    logoutButton.classList.add("hidden");
    loginButton.classList.remove("hidden");
  }

  function changeSlide(direction) {
    let nextIndex = currentIndex + direction;

    if (nextIndex < 0) {
      nextIndex = totalSlides - 1; // Vai all'ultima immagine
    } else if (nextIndex >= totalSlides) {
      nextIndex = 0; // Torna alla prima immagine
    }

    // Calcola la traslazione per spostare le immagini
    slideContainer.style.transition = "transform 0.5s ease-in-out";
    slideContainer.style.transform = `translateX(-${nextIndex * (100 / imagesToShow)}%)`;

    currentIndex = nextIndex;
  }

  prevButton.addEventListener("click", () => {
    changeSlide(-1); // Vai alla slide precedente
  });

  nextButton.addEventListener("click", () => {
    changeSlide(1); // Vai alla slide successiva
  });

  loginButton.addEventListener("click", () => {
    window.location.href = "/assets/auth/login.html";
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/assets/auth/login.html";
  });

  // Aggiungere l'animazione al passaggio del cursore
  slides.forEach((slide) => {
    slide.addEventListener("mouseover", () => {
      slide.style.transform = "scale(1.1)"; // Ingrandisci la slide
      slide.style.transition = "transform 0.3s ease-in-out"; // Aggiungi una transizione
    });

    slide.addEventListener("mouseout", () => {
      slide.style.transform = "scale(1)"; // Ripristina la dimensione originale
    });
  });

  const cards = document.querySelectorAll(".card");
  const CONFIG = window.__CONFIG__;

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

        console.log("STATUS:", res.status); 
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

      if (!target) {
        console.error("Card senza data-target", card);
        return;
      }


      window.location.href = `/assets/dashboard/${target}.html`;
    });
  });
});
