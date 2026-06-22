window.addEventListener("DOMContentLoaded", () => {



  console.log("JS register caricato");
    const btn = document.getElementById("registerBtn");

    if (!btn) {
        console.error("Register button non trovato");
        return;
    }

    btn.addEventListener("click", async () => {

    const username = document.getElementById("username").value;
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;

        try {
            const response = await fetch("https://api-content-manager-postgresql.onrender.com/api/utenti", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Registrazione fallitas");
            }

            window.location.href = "/assets/index.html";

        } catch (err) {
            console.error(err);
            alert("Errore registrazione");
        }
    });
});