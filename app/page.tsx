import React from 'react'
import FruitHandler from '@/ui/FruitHandler';
import { fetchFruits, fetchLastTransactionId} from "@/lib/data";

export default async function Page() {

  const fruitsData = await fetchFruits();

  return (
    <div>
      <div id='logo' className="border-solid border-4 border-emerald-700 mb-2 flex h-30 w-60 justify-start rounded-md bg-green-400 p-4">
        <div className="text-white h-20 md:w-60 drop-shadow-[2.5px_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1>Jenny&apos;s Fruit Store</h1>
        </div>
      </div>
      <div>
        <div>
          <FruitHandler fruits={fruitsData} />
        </div>
      </div>
    </div>
  );
}