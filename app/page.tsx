import React from "react";
import FruitHandler from "@/ui/FruitHandler";
import { fetchFruits } from "@/lib/data";

export default async function Page() {
  const fruitsData = await fetchFruits();

  return (
    <div>
      <div>
        <div>
          <FruitHandler fruits={fruitsData} />
        </div>
      </div>
    </div>
  );
}