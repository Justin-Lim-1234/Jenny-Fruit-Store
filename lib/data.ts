import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from 'next/cache';
import {
    Fruit,
} from './definitions'

export async function fetchFruits() {

    noStore();

    try {
        const data = await sql<Fruit>`SELECT * FROM fruits`;

        return data.rows;
    }
    catch (error) {
        console.error('Database error: ', error);
        throw new Error('Failed to fetch fruits data.');
    }
}