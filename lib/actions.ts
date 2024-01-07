'use server';

import { sql } from "@vercel/postgres";
import { fetchFruits, fetchLastTransactionId, fetchTransactionItems, fetchTransactions } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logTransaction(total: number, fruits: { id: number; name: string; quantity: number }[]) {

    console.log('--------------------------------');

    const t_Id = await fetchLastTransactionId();
    const fruitData = await fetchFruits();
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    const fruitArr = fruits;

    for (let i = 0; i < fruitArr.length; i++) {



        for (let j = 0; j < fruitData.length; j++) {
            if (fruitArr[i].name === fruitData[j].name) {

                const newQty = fruitData[j].quantity - fruitArr[i].quantity;

                console.log(`current qty for ${fruitData[j].name} = ${fruitData[j].quantity}`)

                console.log(`newqty = ${fruitData[j].quantity} - ${fruitArr[i].quantity}`)

                console.log(`compare: ${fruitArr[i].id} and ${fruitData[j].id}`)

                console.log(`setting ${newQty} for ${fruitArr[i].name} into items table`);
                try {
                    await sql`INSERT INTO transaction_items (transaction_id, fruit_id, quantity, total_price)
                    VALUES (${t_Id}, ${fruitArr[i].id}, ${fruitArr[i].quantity}, ${total})`;
                }
                catch (error) {
                    return {
                        message: 'Database Error: Failed to Create Transaction_Item Entry',
                    };
                };

                console.log(`set ${newQty} for ${fruitArr[i].name} into items table`);


                console.log(`ammending qty for ${fruitArr[i].name}`);
                try {
                    await sql`UPDATE fruits
                            SET quantity = ${newQty}
                            WHERE id = ${fruitArr[i].id}`;
                }

                catch (error) {
                    return {
                        message: 'Database Error: Failed to Create Transaction_Item Entry',
                    };
                };
                console.log(`ammended qty for ${fruitArr[i].name}`);
            }
            else {
                continue
            }
        }


    }

    console.log(`adding into transaction table`);
    try {
        await sql`INSERT INTO transactions (timestamp)
        VALUES (${timestamp})`;
    }

    catch (error) {
        return {
            message: 'Database Error: Failed to Create Transaction Entry',
        };
    };
    console.log(`added into transaction table`);

    console.log('completed');

    revalidatePath('./');
    redirect('./');


}