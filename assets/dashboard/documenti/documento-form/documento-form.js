// const API_URL =  "https://api-content-manager-postgresql.onrender.com/api/documenti";
const CONFIG = window.__CONFIG__;

/* =========================
   TOKEN
========================= */
function getToken() {
  return localStorage.getItem("token");
}

/* =========================
   CREATE (SALVA DOCUMENTO)
========================= */
async function salvaDocumento() {
  const token = getToken();

  const rawJson = document.getElementById("struttura_json").value;

  let strutturaJson;

  try {
    strutturaJson = rawJson && rawJson.trim() !== "" ? JSON.parse(rawJson) : {};
  } catch (e) {
    alert("JSON non valido");
    return;
  }

  const payload = {
    nome: document.getElementById("nome").value,
    descrizione: document.getElementById("descrizione").value,
    tipo: document.getElementById("tipo").value,
    stato: document.getElementById("stato").value,
    tipoDocumentoId: Number(document.getElementById("tipo_id").value),

    strutturaJson: JSON.stringify(strutturaJson),
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
      throw new Error("Errore salvataggio documento");
    }

    window.location.href = "/assets/dashboard/dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Errore durante il salvataggio");
  }
}

async function loadTipiDocumento() {
  const token = getToken();

  //const res = await fetch("http://localhost:8080/api/tipi-documento", {
  const res = await fetch(`${CONFIG.API_BASE_URL}/api/tipi-documento`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    console.error("Errore caricamento tipi documento");
    return;
  }

  const tipi = await res.json();

  const select = document.getElementById("tipo_id");
  select.innerHTML = "";

  tipi.forEach((t) => {
    const option = document.createElement("option");
    option.value = t.id;
    option.textContent = t.nome;
    select.appendChild(option);
  });
}
/* =========================
   NAV BACK
========================= */
function tornaIndietro() {
  window.location.href = "/assets/dashboard/dashboard.html";
}


document.addEventListener("DOMContentLoaded", loadTipiDocumento);