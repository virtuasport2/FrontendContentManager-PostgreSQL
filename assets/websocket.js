(function () {
  let socket = null;
  let listeners = [];

  function isOpen() {
    return socket && socket.readyState === WebSocket.OPEN;
  }

  function start() {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (isOpen()) return;

    // socket = new WebSocket(window.__CONFIG__.WS_URL);
    socket = new WebSocket(window.__CONFIG__.WS_URL + "?token=" + token);

    socket.onopen = () => {
      console.log("WS OPEN");
      console.log("STATE OPEN:", socket.readyState);
      console.log("URL:", socket.url);
    };

    socket.onmessage = (event) => {
      console.log("RECEIVED:", event.data);
      console.log("LISTENERS:", listeners.length);
      listeners.forEach((cb) => cb(event.data));
    };

    socket.onerror = (e) => console.log("WS ERROR", e);

    socket.onclose = (e) => {
      console.log("WS CLOSED");
      console.log("code:", e.code);
      console.log("reason:", e.reason);
    };

    console.log("WS URL =", window.__CONFIG__.WS_URL);
    console.log("READY STATE:", socket.readyState);
  }

  function stop() {
    if (socket) {
      socket.close();
      socket = null;
    }
    listeners = [];
  }

  function subscribe(cb) {
    listeners.push(cb);
  }

  window.LogWebSocket = {
    start,
    stop,
    subscribe,
  };
})();
