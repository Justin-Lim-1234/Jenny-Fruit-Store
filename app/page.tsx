import FruitNode from "@/ui/FruitNode";
import { fetchFruits } from "@/lib/data";

export default async function Page() {

  const fruitsData = await fetchFruits();

  return (
    <div>
        <div id='logo' className="mb-2 flex h-30 w-60 justify-start rounded-md bg-green-400 p-4">
            <div className="text-white h-20 md:w-60 drop-shadow-[2.5px_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <h1>Jenny&apos;s Fruit Store</h1>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md-h-full h-vh w-full justify-start rounded-md bg-gray-200 p-3">
          {fruitsData.map((fruit) => (
            <FruitNode
            key={fruit.id}
            id={fruit.id}
            name={fruit.name}
            price={fruit.price}
            qty={fruit.qty}
          />
          ))}
        </div>
    </div>
  );
}