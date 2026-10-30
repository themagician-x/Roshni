const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("roshni", {
  platform: process.platform,
  load: () => ipcRenderer.invoke("db:load"),
  save: (json) => ipcRenderer.invoke("db:save", json),
});
