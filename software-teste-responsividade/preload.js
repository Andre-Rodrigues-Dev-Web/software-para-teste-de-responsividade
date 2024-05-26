const { contextBridge, ipcRenderer } = require('electron');

// Funções que serão expostas para a página renderizada
const api = {
  // Exemplo de função permitida
  sampleFunction: () => {
    // Implementação da função
  },

  // Exemplo de uso do ipcRenderer
  sendToMain: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  // Exemplo de uso do ipcRenderer com listener
  receiveFromMain: (channel, listener) => {
    ipcRenderer.on(channel, listener);
  }
};

// Expondo as funções de forma segura usando contextBridge
contextBridge.exposeInMainWorld('electron', api);

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
