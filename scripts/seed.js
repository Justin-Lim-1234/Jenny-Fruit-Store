const { db } = require('@vercel/postgres');
const pgp = require('pg-promise')();

const connectionString = 'postgres://default:y9FomrP6wxzh@ep-square-resonance-68681669-pooler.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require'; // Replace with your actual PostgreSQL connection string


// Seed data for fruits
const fruits = [
  { name: 'Apple', price: 2.00 },
  { name: 'Banana', price: 1.50 },
  { name: 'Pear', price: 2.30},
  { name: 'Orange', price: 1.80},
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
          price DECIMAL(10, 2) NOT NULL
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
      await t.batch(fruits.map((fruit) => t.none('INSERT INTO fruits(name, price) VALUES($1, $2)', [fruit.name, fruit.price])));
    });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from the database
    pgp.end();
  }
}

// Run the seeding function
seed();


// const fruits = [
//   { name: 'Apple', price: 2.00 },
//   { name: 'Banana', price: 1.50 },
//   { name: 'Pear', price: 2.30},
//   { name: 'Orange', price: 1.80},
// ];

// async function seedFruits(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         price DECIMAL(10, 2) NOT NULL,
//         quantity INTEGER NOT NULL
//       )
//     `;

//     console.log('Fruits table created');

//     // Insert data into the "users" table
//     const insertedFruits = await Promise.all(
//       fruits.map(async (fruit) => {
//         return client.sql`
//         INSERT INTO fruits (id, name, price, quantity)
//         VALUES (${fruit.id}, ${fruit.name}, ${fruit.price}, ${fruit.qty})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedFruits.length} fruits`);

//     return {
//       createTable,
//       fruits: insertedFruits,
//     };
//   } catch (error) {
//     console.error('Error seeding fruits:', error);
//     throw error;
//   }
// }

// async function seedTransactions(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "invoices" table if it doesn't exist
//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS transactions (
//         id SERIAL PRIMARY KEY,
//         timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
//       )
//     `;

//     console.log('Transaction table created');

//     return {
//       createTable,
//     };
//   } catch (error) {
//     console.error('Error seeding transactions:', error);
//     throw error;
//   }
// }

// async function seedTransactionItems(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS transaction_items (
//         id SERIAL PRIMARY KEY,
//         transaction_id INTEGER REFERENCES transactions(id),
//         fruit_id INTEGER REFERENCES fruits(id),
//         quantity INTEGER NOT NULL,
//         total_price DECIMAL(10, 2) NOT NULL
//       )
//     `;

//     console.log('TransactionItems table created');

//     return {
//       createTable,
//     };
//   } catch (error) {
//     console.error('Error seeding TransactionItems:', error);
//     throw error;
//   }
// }

// async function main() {
//   const client = await db.connect();

//   await seedFruits(client);
//   await seedTransactions(client);
//   await seedTransactionItems(client);

//   await client.end();
// }

// main().catch((err) => {
//   console.error(
//     'An error occurred while attempting to seed the database:',
//     err,
//   );
// });
