const puppeteerConfig = {
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox", 
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--disable-web-security",
    "--disable-features=VizDisplayCompositor",
    "--disable-extensions",
    "--disable-plugins",
    "--disable-default-apps",
    "--disable-sync",
    "--disable-translate",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--mute-audio",
    "--disable-accelerated-2d-canvas",
    "--no-zygote",
    "--single-process",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
    "--disable-ipc-flooding-protection"
  ],
  // Configurações para acelerar inicialização
  timeout: 60000,
  protocolTimeout: 60000,
  // Desabilitar download automático do Chromium se já estiver instalado
  skipDownload: process.env.SKIP_PUPPETEER_DOWNLOAD === 'true',
  // Configurações adicionais para performance
  ignoreDefaultArgs: ['--disable-extensions'],
  ignoreHTTPSErrors: true
};

// Configurar executablePath apenas se especificado
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  puppeteerConfig.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

module.exports = puppeteerConfig; 