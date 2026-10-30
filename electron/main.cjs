// Roshni desktop shell: one window, and a JSON file in the user's AppData that holds all progress.
const { app, BrowserWindow, ipcMain, Menu, screen } = require("electron");
const fs = require("node:fs");
const path = require("node:path");

const DEV = process.env.ROSHNI_DEV === "1";
const MAC = process.platform === "darwin";
/** Must match the header height in src/components/Header.tsx. */
const TITLE_BAR_HEIGHT = 40;
/** Smallest window the lessons are designed for; reduced only on screens that cannot fit it. */
const MIN_SIZE = { width: 1280, height: 780 };
const dataFile = () => path.join(app.getPath("userData"), "roshni-data.json");

ipcMain.handle("db:load", () => {
  try {
    return fs.readFileSync(dataFile(), "utf8");
  } catch {
    return null;
  }
});

ipcMain.handle("db:save", (_e, json) => {
  // Write to a temp file then rename, so a crash mid-write never corrupts the data.
  const file = dataFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file + ".tmp", json, "utf8");
  fs.renameSync(file + ".tmp", file);
  return true;
});

function createWindow() {
  const area = screen.getPrimaryDisplay().workAreaSize;
  const width = Math.min(MIN_SIZE.width, area.width);
  const height = Math.min(MIN_SIZE.height, area.height);
  const win = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    center: true,
    title: "Roshni",
    backgroundColor: "#fffaf2",
    autoHideMenuBar: true,
    // Our own header is the title bar; the OS still draws the window buttons.
    titleBarStyle: "hidden",
    ...(MAC
      ? { trafficLightPosition: { x: 14, y: 13 } }
      : { titleBarOverlay: { color: "#ffffff", symbolColor: "#7a6a58", height: TITLE_BAR_HEIGHT } }),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      devTools: DEV,
    },
  });
  if (DEV) win.loadURL("http://localhost:4000");
  else win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
}

if (!DEV) Menu.setApplicationMenu(null);

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
