const { db } = require("@vercel/postgres");
const pgp = require("pg-promise")();

const connectionString = db.connectionString;

// Seed data for fruits
const fruits = [
  { name: "Apple", price: 2.0, qty: 50 },
  { name: "Banana", price: 1.5, qty: 50 },
  { name: "Pear", price: 2.3, qty: 50 },
  { name: "Orange", price: 1.8, qty: 50 },
];

// Define the seed function
async function seed() {
  const db = pgp(connectionString);
  try {
    // Use transactions for atomicity
    await db.tx(async (t) => {
      // Create fruits table
      await t.none(`
        CREATE TABLE IF NOT EXISTS fruits (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          quantity INTEGER NOT NULL
        )
      `);

      // Create transactions table
      await t.none(`
        CREATE TABLE IF NOT EXISTS transactions (
          id SERIAL PRIMARY KEY,
          timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create transaction_items table
      await t.none(`
        CREATE TABLE IF NOT EXISTS transaction_items (
          id SERIAL PRIMARY KEY,
          transaction_id INTEGER REFERENCES transactions(id),
          fruit_id INTEGER REFERENCES fruits(id),
          quantity INTEGER NOT NULL,
          total_price DECIMAL(10, 2) NOT NULL
        )
      `);

      // Insert initial values into fruits table
      await t.batch(
        fruits.map((fruit) =>
          t.none("INSERT INTO fruits(name, price) VALUES($1, $2)", [
            fruit.name,
            fruit.price,
          ])
        )
      );
    });

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Disconnect from the database
    pgp.end();
  }
}

// Run the seeding function
seed();
