const API_URL =
  "https://api-content-manager-postgresql.onrender.com/api/documenti";

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
    strutturaJson = rawJson && rawJson.trim() !== ""
      ? JSON.parse(rawJson)
      : {};
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

    strutturaJson: JSON.stringify(strutturaJson)
};

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(payload)
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
