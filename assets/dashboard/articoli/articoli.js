async function loadArticoli(main, token) {
  main.innerHTML = "<h2>Articoli</h2><p>Caricamento...</p>";

  try {
    const response = await fetch(
      "https://api-content-manager-postgresql.onrender.com/api/articoli",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Errore caricamento articoli");
    }

    const articoli = await response.json();

    renderArticoli(main, articoli, token);
  } catch (err) {
    console.error(err);
    main.innerHTML = "<p>Errore nel caricamento articoli</p>";
  }
}

function renderArticoli(main, articoli, token) {
  let html = `
        <h2>Articoli</h2>

        <button onclick="createArticolo()">+ Nuovo Articolo</button>

        <table border="1" width="100%" style="margin-top:10px;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titolo</th>
                    <th>Categoria</th>
                    <th>Stato</th>
                    <th>Data</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
       

`;

  articoli.forEach((a) => {
    html += `
            <tr>
                <td>${a.id}</td>
                <td>${a.titolo}</td>
                <td>${a.categoria ?? ""}</td>
                <td>${a.stato_autorizzazione ?? ""}</td>
                <td>${a.data_creazione ?? ""}</td>
                <td>
                    <button onclick="viewArticolo(${a.id})">View</button>
                    <button onclick="editArticolo(${a.id})">Edit</button>
                    <button onclick="deleteArticolo(${a.id})">Delete</button>
                </td>
            </tr>
        `;
  });

  html += `
            </tbody>
        </table>
    `;

  main.innerHTML = html;
}

/* =========================
   VIEW
========================= */
window.viewArticolo = async function (id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(
      "https://api-content-manager-postgresql.onrender.com/api/articoli/" + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    const a = await res.json();

    alert(
      "ID: " +
        a.id +
        "\nTitolo: " +
        a.titolo +
        "\nSottotitolo: " +
        (a.sottotitolo ?? "") +
        "\nTesto: " +
        (a.testo ?? "") +
        "\nCategoria: " +
        (a.categoria ?? ""),
    );
  } catch (err) {
    console.error(err);
  }
};

/* =========================
   DELETE
========================= */
window.deleteArticolo = async function (id) {
  const token = localStorage.getItem("token");

  if (!confirm("Eliminare articolo?")) return;

  try {
    const res = await fetch(
      "https://api-content-manager-postgresql.onrender.com/api/articoli/" + id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );

    if (!res.ok) throw new Error("Errore delete");

    location.reload();
  } catch (err) {
    console.error(err);
  }
};


/* =========================
   CREATE
========================= */
window.createArticolo = function () {

     window.location.href = "/assets/dashboard/articoli/articolo-form/articolo-form.html";
};


/* =========================
   EDIT (semplice demo)
========================= */
window.editArticolo = async function (id) {
  const token = localStorage.getItem("token");

  const nuovoTitolo = prompt("Nuovo titolo:");
  if (!nuovoTitolo) return;

  try {
    const res = await fetch(
      "https://api-content-manager-postgresql.onrender.com/api/articoli/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          titolo: nuovoTitolo,
        }),
      },
    );

    if (!res.ok) throw new Error("Errore update");

    location.reload();
  } catch (err) {
    console.error(err);
  }
};
