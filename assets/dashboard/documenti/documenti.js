async function loadDocumenti(main, token) {
  main.innerHTML = "<h2>Documenti</h2><p>Caricamento...</p>";

  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/api/documenti`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("STATUS:", response.status);

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    if (!response.ok) {
      throw new Error("Errore backend documenti");
    }

    const documenti = text ? JSON.parse(text) : [];

    renderDocumenti(main, documenti, token);
  } catch (err) {
    console.error(err);
    main.innerHTML = "<p>Errore nel caricamento documenti</p>";
  }
}

function renderDocumenti(main, documenti, token) {
  let html = `
    <h2>Documenti</h2>

    <button onclick="createDocumento()">+ Crea Documento</button>

    <table border="1" width="100%" style="margin-top:10px;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Stato</th>
          <th>Tipo ID</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
  `;

  if (!documenti || documenti.length === 0) {
    html += `
      <tr>
        <td colspan="6">Nessun documento presente</td>
      </tr>
    `;
  } else {
    documenti.forEach((d) => {
      html += `
        <tr>
          <td>${d.id}</td>
          <td>${d.nome}</td>
          <td>${d.tipo}</td>
          <td>${d.stato}</td>
          <td>${d.tipo_id}</td>
          <td>
            <button onclick="viewDocumento(${d.id})">View</button>
            <button onclick="editDocumento(${d.id})">Edit</button>
            <button onclick="deleteDocumento(${d.id})">Delete</button>
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

/* =========================
   VIEW DOCUMENTO
========================= */
window.viewDocumento = async function (id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/documenti/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const d = await res.json();

    alert(
      "ID: " +
        d.id +
        "\nNome: " +
        d.nome +
        "\nDescrizione: " +
        (d.descrizione ?? "") +
        "\nTipo: " +
        d.tipo +
        "\nStato: " +
        d.stato +
        "\nTipo ID: " +
        d.tipo_id +
        "\nJSON: " +
        (d.struttura_json ?? ""),
    );
  } catch (err) {
    console.error(err);
  }
};

/* =========================
   DELETE DOCUMENTO
========================= */
window.deleteDocumento = async function (id) {
  const token = localStorage.getItem("token");

  if (!confirm("Eliminare documento?")) return;

  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/api/documenti/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Errore delete");

    location.reload();
  } catch (err) {
    console.error(err);
  }
};

/* =========================
   CREATE DOCUMENTO
========================= */
window.createDocumento = function () {
  window.location.href =
    "/assets/dashboard/documenti/documento-form/documento-form.html";
};

/* =========================
   EDIT DOCUMENTO
========================= */
window.editDocumento = async function (id) {
  const token = localStorage.getItem("token");

  const nuovoNome = prompt("Nuovo nome documento:");
  if (!nuovoNome) return;

  try {
    const res = await fetch(
      `${CONFIG.API_BASE_URL}/api/documenti/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          nome: nuovoNome,
        }),
      },
    );

    console.log("TOKEN:", token);
    if (!res.ok) throw new Error("Errore update");

    location.reload();
  } catch (err) {
    console.error(err);
  }
};
