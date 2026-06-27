window.addEventListener("DOMContentLoaded", () => {

  const CONFIG = window.__CONFIG__;

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
            const response = await fetch(`${CONFIG.API_BASE_URL}/api/utenti`, {
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