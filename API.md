# API Documentation

## Endpoints

### Interface Web

#### `GET /`
- **Descrição**: Página principal da interface web
- **Resposta**: HTML da interface

#### `GET /api/status`
- **Descrição**: Verifica status do WhatsApp
- **Resposta**:
```json
{
  "isReady": true
}
```

#### `GET /api/conversations`
- **Descrição**: Lista todas as conversas
- **Resposta**:
```json
[
  {
    "id": 1,
    "number": "+5511999999999",
    "first_message": "ep",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### `GET /api/conversation/:number`
- **Descrição**: Busca histórico de uma conversa
- **Parâmetros**: `number` - Número do telefone
- **Resposta**:
```json
[
  {
    "id": 1,
    "number": "+5511999999999",
    "message": "ep",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "is_from_client": true
  }
]
```

#### `POST /api/send-message`
- **Descrição**: Envia mensagem para um número
- **Body**:
```json
{
  "number": "+5511999999999",
  "message": "Olá!"
}
```
- **Resposta**:
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso"
}
```

#### `POST /api/send-buttons`
- **Descrição**: Envia botões de opções para um número
- **Body**:
```json
{
  "number": "+5511999999999"
}
```
- **Resposta**:
```json
{
  "success": true,
  "message": "Botões enviados com sucesso"
}
```

### Webhook

#### `POST /webhook`
- **Descrição**: Recebe webhooks externos
- **Body**: Payload do webhook
- **Resposta**: `200 OK`

#### `GET /webhook/test`
- **Descrição**: Testa se o webhook está funcionando
- **Resposta**:
```json
{
  "status": "success",
  "message": "Webhook endpoint está funcionando",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### `GET /webhook/status`
- **Descrição**: Verifica status do webhook
- **Resposta**:
```json
{
  "webhook_active": true,
  "whatsapp_ready": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Health Check

#### `GET /health`
- **Descrição**: Verifica saúde da aplicação
- **Resposta**:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "whatsapp_ready": true
}
```

## Códigos de Status

- `200`: Sucesso
- `400`: Bad Request (dados inválidos)
- `500`: Internal Server Error

## Exemplos de Uso

### Enviar mensagem via API
```bash
curl -X POST http://localhost:3000/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "number": "+5511999999999",
    "message": "Olá! Como posso ajudar?"
  }'
```

### Verificar status
```bash
curl http://localhost:3000/api/status
```

### Testar webhook
```bash
curl http://localhost:3000/webhook/test
``` 