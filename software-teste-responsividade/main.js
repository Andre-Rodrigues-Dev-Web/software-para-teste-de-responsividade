const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Configuração da CSP
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'", 'https://andrelaurentino.com.br'], // Adicione os domínios permitidos aqui
          frameSrc: ["'self'", 'https://andrelaurentino.com.br'],   // Adicione os domínios permitidos aqui
          objectSrc: ["'none'"],
          workerSrc: ["'self'"],
          childSrc: ["'self'"],
        },
      },
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
      webSecurity: true,
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      allowRunningInsecureContent: false,
    }
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html')).catch((err) => {
    console.error('Erro ao carregar o arquivo index.html:', err);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
