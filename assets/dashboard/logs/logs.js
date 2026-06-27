let logSocket = null;

function loadLogs() {
  const main = document.getElementById("main");

  main.innerHTML = `
    <h2>Logs</h2>
    <div id="logBox"
         style="height:400px; overflow:auto; background:#111; color:#0f0; padding:10px;">
    </div>
  `;

  const logBox = document.getElementById("logBox");

  if (!logSocket || logSocket.readyState !== WebSocket.OPEN) {
    logSocket = new WebSocket("ws://localhost:8080/logs");
  }

  logSocket.onopen = () => {
    console.log("WS OPEN");
  };

  logSocket.onmessage = (event) => {
    console.log("RX:", event.data);

    if (!logBox) return;

    const line = document.createElement("div");
    line.textContent = event.data;

    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  };

  logSocket.onerror = (e) => {
    console.log("WS ERROR", e);
  };

  logSocket.onclose = () => {
    console.log("WS CLOSED");
    logSocket = null;
  };
}