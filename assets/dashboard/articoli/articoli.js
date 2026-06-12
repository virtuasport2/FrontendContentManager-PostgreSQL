async function loadArticoli(main, token) {

    main.innerHTML = "<h2>Articoli</h2><p>Caricamento...</p>";

    try {
        const response = await fetch(
            "https://api-content-manager-postgresql.onrender.com/api/articoli",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) {
            throw new Error("Errore caricamento articoli");
        }

        const articoli = await response.json();

        renderArticoli(main, articoli);

    } catch (err) {
        console.error(err);
        main.innerHTML = "<p>Errore nel caricamento articoli</p>";
    }
}

function renderArticoli(main, articoli) {

    let html = `
        <h2>Articoli</h2>

        <button onclick="alert('nuovo articolo')">
            + Nuovo Articolo
        </button>

        <table border="1" width="100%" style="margin-top:10px;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Titolo</th>
                    <th>Categoria</th>
                    <th>Stato</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
    `;

    articoli.forEach(a => {
        html += `
            <tr>
                <td>${a.id}</td>
                <td>${a.titolo}</td>
                <td>${a.categoria ?? ""}</td>
                <td>${a.statoAutorizzazione}</td>
                <td>${a.dataCreazione ?? ""}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    main.innerHTML = html;
}