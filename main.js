// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const currentWindow = require("electron").BrowserWindow.getFocusedWindow();
const path = require("path");

process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";
const isWin = process.platform === "win32";

let mainWindow;

const createMainWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: isDev ? 1500 : 975,
		height: 675,
		transparent: true,
		resizable: false,
		frame: false,
		icon: isWin
			? path.join(__dirname, "./Renderer/assets/icons/icon.ico")
			: path.join(__dirname, "./Renderer/assets/icons/icon.png"),
		webPreferences: {
			// Set this to false when in production
			devTools: false,
			nodeIntegration: true,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	if (isDev) {
		mainWindow.webContents.openDevTools();
	}

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, "./Renderer/index.html"));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Get the button element
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createMainWindow();

	// Remove mainWindow from memory on close to prevent memory leak
	mainWindow.on("closed", () => (mainWindow = null));

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (!isMac) {
		app.quit();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("close-window", () => {
	const window = BrowserWindow.getFocusedWindow();
	if (window) {
		window.close();
	}
});

ipcMain.on("minimize-window", () => {
	const window = BrowserWindow.getFocusedWindow();
	if (window) {
		window.minimize();
	}
});
