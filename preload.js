const { contextBridge, ipcRenderer } = require("electron");
// const { KanbanAPI } = require("./api/KanbanAPI");

// const kanbanApi = new KanbanAPI();

contextBridge.exposeInMainWorld("electron", {
	closeWindow: () => ipcRenderer.send("close-window"),
	minimizeWindow: () => ipcRenderer.send("minimize-window"),
});