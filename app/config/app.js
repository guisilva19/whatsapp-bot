require("dotenv").config();

const appConfig = {
  // Configurações do servidor
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0"
  },

  // Configurações do WhatsApp
  whatsapp: {
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor"
      ]
    },
    authStrategy: "LocalAuth"
  },

  // Configurações do banco de dados
  database: {
    path: process.env.DB_PATH || "./db/contacts.db",
    timeout: 30000
  },

  // Configurações de webhook
  webhook: {
    enabled: process.env.WEBHOOK_ENABLED === "true",
    url: process.env.WEBHOOK_URL,
    token: process.env.WEBHOOK_TOKEN
  },

  // Configurações de ambiente
  environment: process.env.NODE_ENV || "development",
  
  // Configurações de log
  logging: {
    level: process.env.LOG_LEVEL || "info",
    enabled: process.env.LOG_ENABLED !== "false"
  }
};

module.exports = appConfig; 