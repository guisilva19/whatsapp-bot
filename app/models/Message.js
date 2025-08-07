const { Pool } = require('pg');
const databaseConfig = require('../config/database');

class Message {
  constructor() {
    this.pool = new Pool(databaseConfig.postgres);
    this.initTables();
  }

  async initTables() {
    try {
      await this.pool.query(databaseConfig.tables.messages);
      await this.pool.query(databaseConfig.tables.conversations);
      console.log('✅ Tabelas PostgreSQL inicializadas');
    } catch (error) {
      console.error('❌ Erro ao inicializar tabelas:', error);
    }
  }

  async create(number, message, isFromClient = true) {
    try {
      const result = await this.pool.query(
        "INSERT INTO messages (number, message, is_from_client) VALUES ($1, $2, $3) RETURNING id",
        [number, message, isFromClient]
      );
      return result.rows[0].id;
    } catch (error) {
      console.error('Erro ao criar mensagem:', error);
      throw error;
    }
  }

  async getByNumber(number, limit = 50) {
    try {
      const result = await this.pool.query(
        "SELECT * FROM messages WHERE number = $1 ORDER BY timestamp DESC LIMIT $2",
        [number, limit]
      );
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar mensagens por número:', error);
      return [];
    }
  }

  async getAll(limit = 100) {
    try {
      const result = await this.pool.query(
        "SELECT * FROM messages ORDER BY timestamp DESC LIMIT $1",
        [limit]
      );
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todas as mensagens:', error);
      return [];
    }
  }

  async getConversations() {
    try {
      const result = await this.pool.query(
        "SELECT * FROM conversations ORDER BY created_at DESC"
      );
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
      return [];
    }
  }

  async createConversation(number, firstMessage) {
    try {
      const result = await this.pool.query(
        "INSERT INTO conversations (number, first_message) VALUES ($1, $2) ON CONFLICT (number) DO NOTHING RETURNING id",
        [number, firstMessage]
      );
      return result.rows[0]?.id;
    } catch (error) {
      console.error('Erro ao criar conversa:', error);
      throw error;
    }
  }

  async getConversationByNumber(number) {
    try {
      const result = await this.pool.query(
        "SELECT * FROM conversations WHERE number = $1",
        [number]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar conversa por número:', error);
      return null;
    }
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = Message; 