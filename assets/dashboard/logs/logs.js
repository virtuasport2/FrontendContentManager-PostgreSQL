function loadLogs() {
  const main = document.getElementById("main");

  main.innerHTML = `
    <h2>Logs</h2>
    <div id="logBox"
         style="height:400px; overflow:auto; background:#111; color:#0f0; padding:10px;">
    </div>
  `;

  const logBox = document.getElementById("logBox");

  if (!logBox) return;

  // 🔥 PRIMA: assicurati che il socket sia attivo
  window.LogWebSocket.start();

  // 🔥 POI: subscribe
  window.LogWebSocket.subscribe((msg) => {
    const line = document.createElement("div");
    line.textContent = msg;

    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  });
}
