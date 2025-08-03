const WhatsAppService = require("../services/WhatsAppService");

class WebhookController {
  constructor(whatsappService) {
    this.whatsappService = whatsappService;
  }

  // Processa webhook recebido
  async handleWebhook(req, res) {
    const payload = req.body;

    // Ignora mensagens que não são de saída
    if (payload.message_type !== "outgoing") {
      return res.sendStatus(200);
    }

    // Ignora mensagens privadas (ex: anotações internas dos agentes)
    if (payload.private === true) {
      return res.sendStatus(200);
    }

    const conversation = payload.conversation;
    const whatsappNumber =
      conversation.meta?.sender?.phone_number ||
      conversation.meta?.sender?.identifier;
    const messageContent = payload.content;

    if (whatsappNumber && messageContent) {
      const chatId = `${whatsappNumber.replace("+", "")}@c.us`;

      try {
        const client = this.whatsappService.getClient();

        if (client && this.whatsappService.isClientReady()) {
          await client.sendMessage(chatId, messageContent);
          console.log(`✅ Mensagem enviada via webhook para ${whatsappNumber}: ${messageContent}`);
        } else {
          console.error("❌ WhatsApp client não está pronto para enviar mensagem via webhook");
        }
      } catch (error) {
        console.error("❌ Erro ao enviar mensagem via webhook:", error.message);
      }
    }

    res.sendStatus(200);
  }

  // Endpoint de teste do webhook
  testWebhook(req, res) {
    res.json({
      status: "success",
      message: "Webhook endpoint está funcionando",
      timestamp: new Date().toISOString()
    });
  }

  // Endpoint para verificar status do webhook
  getWebhookStatus(req, res) {
    const isReady = this.whatsappService.isClientReady();
    res.json({
      webhook_active: true,
      whatsapp_ready: isReady,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = WebhookController; 