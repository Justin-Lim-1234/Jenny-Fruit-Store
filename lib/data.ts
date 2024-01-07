import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';
import {
    Fruit,
    Transaction,
    Transaction_Item,
} from './definitions'

export async function fetchFruits() {

    noStore();

    try {
        const data = await sql<Fruit>`SELECT * FROM fruits ORDER BY id ASC`;

        return data.rows;
    }
    catch (error) {
        console.error('Database error: ', error);
        throw new Error('Failed to fetch fruits data.');
    }
}

export async function fetchTransactions() {

    noStore();

    try {
        const data = await sql<Transaction>`SELECT * FROM transactions`;

        return data.rows;
    }
    catch (error) {
        console.error('Database error: ', error);
        throw new Error('Failed to fetch transactions data.');
    }
}

export async function fetchLastTransactionId() {

    noStore();

    try {
        const data = await sql<Transaction>`SELECT id FROM transactions ORDER BY id DESC LIMIT 1`;

        return data.rows[0]?.id;
    }
    catch (error) {
        console.error('Database error: ', error);
        throw new Error('Failed to fetch transaction id data.');
    }
}

export async function fetchTransactionItems() {

    noStore();

    try {
        const data = await sql<Transaction_Item>`SELECT * FROM transaction_items`;

        return data.rows;
    }
    catch (error) {
        console.error('Database error: ', error);
        throw new Error('Failed to fetch transaction_items data.');
    }
}