export {}

declare global {
  interface Window {
    // we don't know what might be there
    MSInputMethodContext: any, // this will be your variable name
  }
}
