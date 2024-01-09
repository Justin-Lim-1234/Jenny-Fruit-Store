import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Fruit, SummaryItem, Transaction, Transaction_Item } from "./definitions";

//Fetches the fruits table from the database in order of id
export async function fetchFruits() {
  noStore();

  try {
    const data = await sql<Fruit>`SELECT * FROM fruits ORDER BY id ASC`;

    return data.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch fruits data.");
  }
}

//Fetch the transactions table data
export async function fetchTransactions() {
  noStore();

  try {
    const data = await sql<Transaction>`SELECT * FROM transactions`;

    return data.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch transactions data.");
  }
}

//Fetch last transaction id for processing in the transaction_items table
export async function fetchLastTransactionId() {
  noStore();

  try {
    const data =
      await sql<Transaction>`SELECT id FROM transactions ORDER BY id DESC LIMIT 1`;

    return data.rows[0]?.id;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch transaction id data.");
  }
}

//Fetch transaction_items data
export async function fetchTransactionItems() {
  noStore();

  try {
    const data = await sql<Transaction_Item>`SELECT * FROM transaction_items`;

    return data.rows;
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch transaction_items data.");
  }
}

//Query to fetch the items of the latest transaction_id as well as their names and the total price to display in the summary page
export async function fetchSummaryItems() {
    noStore();

    const latestId = await fetchLastTransactionId();

    try {
        const itemData = await sql<SummaryItem>`SELECT transaction_items.transaction_id, fruits.name, transaction_items.quantity, transaction_items.total_price
        FROM transaction_items
        LEFT JOIN fruits ON fruits.id = transaction_items.fruit_id
        WHERE transaction_items.transaction_id = ${latestId}`;

        return itemData.rows;
    }
 catch (error) {
    console.error("Database error: ", error);
    throw new Error("Failed to fetch latest transaction item data.");
  }
}
