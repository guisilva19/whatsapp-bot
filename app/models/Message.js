const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Message {
  constructor() {
    this.db = new sqlite3.Database(path.resolve(__dirname, "../../db/contacts.db"));
    this.initTable();
  }

  initTable() {
    this.db.run(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT,
      message TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_from_client BOOLEAN DEFAULT 1
    )`);

    this.db.run(`CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT UNIQUE,
      first_message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }

  async create(number, message, isFromClient = true) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO messages (number, message, is_from_client) VALUES (?, ?, ?)",
        [number, message, isFromClient],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  async getByNumber(number, limit = 50) {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT * FROM messages WHERE number = ? ORDER BY timestamp DESC LIMIT ?",
        [number, limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  async getAll(limit = 100) {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT * FROM messages ORDER BY timestamp DESC LIMIT ?",
        [limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  async getConversations() {
    return new Promise((resolve, reject) => {
      this.db.all(
        "SELECT * FROM conversations ORDER BY created_at DESC",
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  async createConversation(number, firstMessage) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT OR IGNORE INTO conversations (number, first_message) VALUES (?, ?)",
        [number, firstMessage],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  }

  async getConversationByNumber(number) {
    return new Promise((resolve, reject) => {
      this.db.get(
        "SELECT * FROM conversations WHERE number = ?",
        [number],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  close() {
    this.db.close();
  }
}

module.exports = Message; 