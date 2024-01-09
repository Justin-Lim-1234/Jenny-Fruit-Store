"use server";

import { sql } from "@vercel/postgres";
import {
  fetchFruits,
  fetchLastTransactionId,
} from "@/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logTransaction(
  total: number,
  fruits: { id: number; name: string; quantity: number }[]
) {

  const fruitData = await fetchFruits();
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const fruitArr = fruits;

  try { //Creates a new entry in transaction table and include the timestamp
    await sql`INSERT INTO transactions (timestamp)
        VALUES (${timestamp})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Transaction Entry",
    };
  }

  const t_Id = await fetchLastTransactionId();

  for (let i = 0; i < fruitArr.length; i++) {
    for (let j = 0; j < fruitData.length; j++) {
      if (fruitArr[i].name === fruitData[j].name) {
        const newQty = fruitData[j].quantity - fruitArr[i].quantity;

        try { //Use transaction id along with other fruit info to create new entries in the transaction_items table
          await sql`INSERT INTO transaction_items (transaction_id, fruit_id, quantity, total_price)
                    VALUES (${t_Id}, ${fruitArr[i].id}, ${fruitArr[i].quantity}, ${total})`;
        } catch (error) {
          return {
            message: "Database Error: Failed to Create Transaction_Item Entry",
          };
        }

        try { //Finally, deduct from the qty of fruits
          await sql`UPDATE fruits
                            SET quantity = ${newQty}
                            WHERE id = ${fruitArr[i].id}`;
        } catch (error) {
          return {
            message: "Database Error: Failed to Create Transaction_Item Entry",
          };
        }

      } else {
        continue;
      }
    }
  }

  //Brings the user to the summary page
  revalidatePath("/summary");
  redirect("/summary");
}

//Brings the user back to the root page
export async function ReturnHome() {
    revalidatePath("/");
    redirect("/");
}