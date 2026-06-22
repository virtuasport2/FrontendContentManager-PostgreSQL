const API_URL =
  "https://api-content-manager-postgresql.onrender.com/api/articoli";

/* =========================
   TOKEN
========================= */
function getToken() {
  return localStorage.getItem("token");
}

/* =========================
   CREATE (SALVA ARTICOLO)
========================= */
async function salvaArticolo() {
  const CONFIG = window.__CONFIG__;
  const token = getToken();

  if (!token) {
    window.location.href = "/assets/auth/login/login.html";
    return;
  }

  const payload = {
    titolo: document.getElementById("titolo").value,
    sottotitolo: document.getElementById("sottotitolo").value,
    categoria: document.getElementById("categoria").value,
    testo: document.getElementById("testo").value,
    visibilita: document.getElementById("visibilita").value === "true",
  };

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/documenti`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Errore salvataggio articolo");
    }

    // ritorno alla lista articoli
    window.location.href = "/assets/dashboard/dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Errore durante il salvataggio");
  }
}

/* =========================
   NAV BACK
========================= */
function tornaIndietro() {
  window.location.href = "/assets/dashboard/dashboard.html";
}
