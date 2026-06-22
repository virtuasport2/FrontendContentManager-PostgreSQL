function toggleMenu() {
  document.querySelector("aside.sidebar").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  alert("JS DASHBOARD PARTITO");
  setTimeout(() => {
    console.log("TOKEN CHECK:", localStorage.getItem("token"));
  }, 5000);

  const token = localStorage.getItem("token");
  console.log("ORIGIN:", window.location.origin);
  console.log("TOKEN RAW:", localStorage.getItem("token"));
  console.log("LOCALSTORAGE FULL:", { ...localStorage });
  console.log("DASHBOARD JS CARICATO");

  console.log("DASHBOARD TOKEN:", token);

  if (!token) {
    window.location.href = "assets/auth/login.html";
    return;
  }

  const main = document.getElementById("main");
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.replace("/assets/auth/login.html");
    });
  }

  window.loadSection = function (section) {
    if (!main) return;

    switch (section) {
      case "articoli":
        if (typeof loadArticoli === "function") {
          loadArticoli(main, token);
        }
        break;

      case "documenti":
        if (typeof loadDocumenti === "function") {
          loadDocumenti(main, token);
        }
        break;

      case "tipidocumento":
        if (typeof loadTipiDocumento === "function") {
          loadTipiDocumento(main, token);
        }
        break;

      case "utenti":
        if (typeof loadUtenti === "function") {
          loadUtenti(main, token);
        }
        break;
    }
  };
});
