
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
    nome:            document.getElementById("nome").value,
    tipo:            document.getElementById("tipo").value,
    descrizione:     document.getElementById("descrizione").value,

    strutturaJson:   JSON.stringify(strutturaJson),
    
 
    stato:           document.getElementById("stato").value,
    tipoDocumentoId: Number(document.getElementById("tipo_id").value), // ATTENZIONE, il tipo documeto deve esistere, creare una lista dei tipi in db

    
};


  const CONFIG = window.__CONFIG__;
  
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/documenti`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.log(res.status);
console.log(res.statusText);
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
