window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");

  if (!btn) {
    console.error("Login button non trovato");
    return;
  }

  let isLoggingIn = false;

  btn.addEventListener("click", async () => {
    if (isLoggingIn) return;
    isLoggingIn = true;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw new Error("Email o password non valide");

          case 403:
            throw new Error("Accesso negato");

          case 500:
            throw new Error("Errore interno server");

          default:
            throw new Error(data.message || "Login fallito");
        }
      }
      localStorage.setItem("token", data.token);

      alert("Login OK");

      //window.location.href = "../index.html";   href → aggiunge storico (BACK torna al login)
      window.location.replace("../index.html"); //replace → NON lascia il login nello storico (più pulito per login)
    } catch (err) {
      // gestione errore
      console.error(err);

      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Errore login");
      }
    } finally {
      // esegui sempre
      isLoggingIn = false;
    }
  });
});
