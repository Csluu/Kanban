// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const Store = require("electron-store");
const currentWindow = require("electron").BrowserWindow.getFocusedWindow();
const path = require("path");

process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";
const isWin = process.platform === "win32";

const store = new Store();

let mainWindow;

const createMainWindow = () => {
	let { x, y } = store.get("windowPosition", { x: undefined, y: undefined });

	// Create the browser window.
	mainWindow = new BrowserWindow({
		x,
		y,
		width: isDev ? 1500 : 855,
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

	// // Makes it so that the application doesn't zoom in or out. Other ways to do this are deprecated or don't work
	// // Will leave this out as it is helpful right now for people with smaller screen sizes.
	// mainWindow.on("focus", () => {
	// 	globalShortcut.register("CommandOrControl+0", () => {
	// 		return;
	// 	});
	// 	globalShortcut.register("CommandOrControl+plus", () => {
	// 		return;
	// 	});
	// 	globalShortcut.register("CommandOrControl+=", () => {
	// 		return;
	// 	});
	// 	globalShortcut.register("CommandOrControl+-", () => {
	// 		return;
	// 	});
	// 	globalShortcut.register("CommandOrControl+_", () => {
	// 		return;
	// 	});
	// });
	// mainWindow.on("blur", () => {
	// 	globalShortcut.unregister("CommandOrControl+0");
	// 	globalShortcut.unregister("CommandOrControl+plus");
	// 	globalShortcut.unregister("CommandOrControl+=");
	// 	globalShortcut.unregister("CommandOrControl+-");
	// 	globalShortcut.unregister("CommandOrControl+_");
	// });

	// Save window position when the window is closed.
	mainWindow.on("close", () => {
		let { x, y } = mainWindow.getBounds();
		store.set("windowPosition", { x, y });
	});

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Get the button element
};

// * App Initialization
// Request single instance lock
// Making sure if there is another instance of this application or not.

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	// If there is another instance running quit this new instance
	console.log("Application is already running");
	app.quit();
} else {
	app.on("second-instance", (event, commandLine, workingDirectory) => {
		// Someone tried to run a second instance, we should focus our window
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

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
}

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
