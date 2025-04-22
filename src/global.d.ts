// global.d.ts
declare global {
  interface Window {
    __env: any; // Adjust the type as needed
  }
}

export {}; // To ensure this file is treated as a module