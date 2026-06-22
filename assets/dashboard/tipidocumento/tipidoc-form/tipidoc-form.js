

/* =========================
   TOKEN
========================= */
function getToken() {
  return localStorage.getItem("token");
}

/* =========================
   CREATE (SALVA DOCUMENTO)
========================= */
async function salvaTipiDoc() {
  const token = getToken();


  /*document: DOM (Document Object Model) e document è il punto di accesso a questo modello */

  const payload = {
    nome: document.getElementById("nome").value,
    descrizione: document.getElementById("descrizione").value,
  };
    
  const CONFIG = window.__CONFIG__;
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/tipi-documento`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });

  
    if (!res.ok) {
      throw new Error("Errore salvataggio documento");
    }

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
