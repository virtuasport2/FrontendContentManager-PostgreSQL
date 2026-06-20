function toggleMenu() {
  document.querySelector("aside.sidebar").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // 🔐 CHECK AUTENTICAZIONE
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../auth/login.html";
    return;
  }





  const main = document.getElementById("main");
  const logoutBtn = document.getElementById("logoutBtn");



  
  // 🚪 LOGOUT
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
   // window.location.href = "../auth/login.html";
   window.location.replace("../auth/login.html"); //replace → NON lascia il login nello storico (più pulito per login)
  });

  // 🧭 ROUTER SEMPLICE (entry point sezioni)
  window.loadSection = function (section) {
    switch (section) {
      case "articoli":
        if (typeof loadArticoli === "function") {
          loadArticoli(main, token);
        } else {
          main.innerHTML = "<h2>Articoli module non caricato</h2>";
        }
        break;

      case "documenti":
        if (typeof loadDocumenti === "function") {
          loadDocumenti(main, token);
        } else {
          main.innerHTML = "<h2>Documenti module non caricato</h2>";
        }
        break;

      case "utenti":
        if (typeof loadUtenti === "function") {
          loadUtenti(main, token);
        } else {
          main.innerHTML = "<h2>Utenti module non caricato</h2>";
        }
        break;

      default:
        main.innerHTML = "<h2>Sezione non trovata</h2>";
    }
  };
});
