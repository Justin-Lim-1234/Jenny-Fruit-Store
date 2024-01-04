import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS Fruits ( Id int(255), Name varchar(255), Price double(255, 2), Quantity int(255) );
                `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// CREATE TABLE IF NOT EXISTS Transactions ( Id int, Date timestamp );
//                 CREATE TABLE IF NOT EXISTS TransactionItems ( Id int, FruitId int, TransactionId int, Quantity int, TotalPrice double );

