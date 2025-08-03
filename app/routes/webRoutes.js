const express = require("express");
const WebController = require("../controllers/WebController");

function createWebRoutes(whatsappService) {
  const router = express.Router();
  const webController = new WebController(whatsappService);

  // Página principal
  router.get("/", (req, res) => webController.renderMainPage(req, res));

  // API Routes
  router.get("/api/status", (req, res) => webController.getWhatsAppStatus(req, res));
  router.get("/api/conversations", (req, res) => webController.getAllConversations(req, res));
  router.get("/api/conversation/:number", (req, res) => webController.getConversationHistory(req, res));
  router.get("/api/pending-messages", (req, res) => webController.getPendingMessages(req, res));
  
  router.post("/api/send-message", (req, res) => webController.sendMessage(req, res));
  router.post("/api/send-buttons", async (req, res) => {
    try {
      const { number } = req.body;
      
      if (!number) {
        return res.status(400).json({ error: "Número é obrigatório" });
      }

      const success = await whatsappService.sendButtons(number);
      
      if (success) {
        res.json({ success: true, message: "Botões enviados com sucesso" });
      } else {
        res.status(500).json({ error: "Erro ao enviar botões" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar botões" });
    }
  });
  
  router.post("/api/mark-responded", (req, res) => webController.markMessageAsResponded(req, res));

  return router;
}

module.exports = createWebRoutes; 