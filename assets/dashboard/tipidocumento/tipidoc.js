// LOAD
async function loadTipoDocumenti(main, token) {
  main.innerHTML = "<h2>Tipi Documento</h2><p>Caricamento...</p>";

  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/api/tipi-documento`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error("Errore backend tipi documento");
    }

    const tipi = text ? JSON.parse(text) : [];

    renderTipoDocumenti(main, tipi, token);
  } catch (err) {
    console.error(err);
    main.innerHTML = "<p>Errore nel caricamento tipi documento</p>";
  }
}

// RENDER
function renderTipoDocumenti(main, tipi, token) {
  let html = `
    <h2>Tipi Documento</h2>

    <button onclick="createTipoDocumento()">+ Crea Tipo Documento</button>

    <table border="1" width="100%" style="margin-top:10px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Descrizione</th>
          <th>Creato Da</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
  `;

  if (!tipi || tipi.length === 0) {
    html += `
      <tr>
        <td colspan="5">Nessun tipo documento presente</td>
      </tr>
    `;
  } else {
    tipi.forEach((t) => {
      html += `
        <tr>
          <td>${t.id}</td>
          <td>${t.nome}</td>
          <td>${t.descrizione ?? ""}</td>
          <td>${t.creato_da ?? ""}</td>
          <td>
            <button onclick="viewTipoDocumento(${t.id})">View</button>
            <button onclick="editTipoDocumento(${t.id})">Edit</button>
            <button onclick="deleteTipoDocumento(${t.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  }

  html += `
      </tbody>
    </table>
  `;

  main.innerHTML = html;
}

// OPERATIONS

// - VIEW
window.viewTipoDocumento = async function (id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${CONFIG.API_BASE_URL}/api/tipi-documento/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const t = await res.json();

  alert(
    "ID: " +
      t.id +
      "\nNome: " +
      t.nome +
      "\nDescrizione: " +
      (t.descrizione ?? "") +
      "\nCreato da: " +
      (t.creato_da ?? ""),
  );
};

// - DELETE
window.deleteTipoDocumento = async function (id) {
  const token = localStorage.getItem("token");

  if (!confirm("Eliminare tipo documento?")) return;

  const res = await fetch(`${CONFIG.API_BASE_URL}/api/tipi-documento/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Errore delete");

  location.reload();
};

// - CREATE
window.createTipoDocumento = function () {
  window.location.href =
    "/assets/dashboard/tipo-documento/tipo-documento-form.html";
};

// - EDIT
window.editTipoDocumento = async function (id) {
  const token = localStorage.getItem("token");

  const nuovoNome = prompt("Nuovo nome tipo documento:");
  if (!nuovoNome) return;

  const res = await fetch(`${CONFIG.API_BASE_URL}/api/tipi-documento/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome: nuovoNome,
    }),
  });

  if (!res.ok) throw new Error("Errore update");

  location.reload();
};
