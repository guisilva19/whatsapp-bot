const express = require("express");
const bodyParser = require("body-parser");
const WebhookController = require("../controllers/WebhookController");

function createWebhookRoutes(whatsappService) {
  const router = express.Router();
  const webhookController = new WebhookController(whatsappService);

  // Middleware para parsing do body
  router.use(bodyParser.json());

  // Webhook principal
  router.post("/", (req, res) => webhookController.handleWebhook(req, res));

  // Endpoint de teste
  router.get("/test", (req, res) => webhookController.testWebhook(req, res));

  // Endpoint de status
  router.get("/status", (req, res) => webhookController.getWebhookStatus(req, res));

  return router;
}

module.exports = createWebhookRoutes; 