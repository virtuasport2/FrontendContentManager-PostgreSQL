export {};

declare global {
  interface Window {
    LogWebSocket: {
      start: () => void;
      stop: () => void;
    };
  }
}