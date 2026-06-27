(function () {

  let socket = null;

  function hasToken() {
    return !!localStorage.getItem("token");
  }

  function initWebSocket() {
    if (!hasToken()) return;

    if (socket && socket.readyState === WebSocket.OPEN) return;

    socket = new WebSocket("ws://localhost:8080/logs");

    socket.onopen = () => {
      console.log("WS OPEN");
    };

    socket.onmessage = (event) => {
      const logBox = document.getElementById("logBox");

      // se non siamo nella pagina logs, non fare nulla
      if (!logBox) return;

      const line = document.createElement("div");
      line.textContent = event.data;

      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
    };

    socket.onerror = (e) => {
      console.log("WS ERROR", e);
    };

    socket.onclose = () => {
      console.log("WS CLOSED");
      socket = null;
    };
  }

  function closeWebSocket() {
    if (socket) {
      socket.close();
      socket = null;
    }
  }

  // ESPONI GLOBALMENTE
  window.LogWebSocket = {
    start: initWebSocket,
    stop: closeWebSocket
  };

})();