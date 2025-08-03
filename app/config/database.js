const path = require("path");

const databaseConfig = {
  // Caminho para o arquivo do banco SQLite
  path: path.resolve(__dirname, "../../db/contacts.db"),
  
  // Configurações do SQLite
  sqlite: {
    verbose: true,
    timeout: 30000
  },
  
  // Configurações das tabelas
  tables: {
    messages: `
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        is_from_client BOOLEAN DEFAULT 1
      )
    `,
    conversations: `
      CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT UNIQUE,
        first_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
  }
};

module.exports = databaseConfig; 