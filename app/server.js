require("dotenv").config();
const express = require("express");

// Importar serviços
const WhatsAppService = require("./services/WhatsAppService");

// Importar rotas
const createWebRoutes = require("./routes/webRoutes");
const createWebhookRoutes = require("./routes/webhookRoutes");

// Configurações
const PORT = process.env.PORT || 3000;

// Inicializar aplicação
const app = express();

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar serviço WhatsApp
const whatsappService = new WhatsAppService();

// Inicializar rotas
const webRoutes = createWebRoutes(whatsappService);
const webhookRoutes = createWebhookRoutes(whatsappService);

// Montar rotas
app.use("/", webRoutes);
app.use("/webhook", webhookRoutes);

// Rota de health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    whatsapp_ready: whatsappService.isClientReady()
  });
});

// Iniciar WhatsApp client
console.log("🚀 Iniciando WhatsApp Bot...");
whatsappService.start();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 Interface web disponível em: http://localhost:${PORT}`);
  console.log(`🔗 Webhook disponível em: http://localhost:${PORT}/webhook`);
  console.log(`📊 Health check em: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Encerrando aplicação...");
  whatsappService.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Encerrando aplicação...");
  whatsappService.stop();
  process.exit(0);
});
