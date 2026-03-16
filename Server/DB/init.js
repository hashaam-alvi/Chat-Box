const db = require("./DB_connection");

async function createTables() {
  try {
    // Create Users table
    await db.none(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username Varchar NOT NULL,
        password Varchar(255),
      );
    `);

    // Create Messages table
    await db.none(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        user_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createTables();
