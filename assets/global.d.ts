export {};

declare global {
  interface Window {
    LogWebSocket: {
      start(): void;
      stop(): void;
      attach(logBox: HTMLElement): void;
      detach(): void;
    };
  }
}