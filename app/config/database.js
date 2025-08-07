const databaseConfig = {
  // Configuração do PostgreSQL do Railway
  postgres: {
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:ivuBVKxoSMeiMPHUTNESYOqpPoAeRWFD@switchback.proxy.rlwy.net:29547/railway",
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  },
  
  // Configurações das tabelas
  tables: {
    messages: `
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        number VARCHAR(20),
        message TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_from_client BOOLEAN DEFAULT true
      )
    `,
    conversations: `
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        number VARCHAR(20) UNIQUE,
        first_message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
  }
};

module.exports = databaseConfig; 