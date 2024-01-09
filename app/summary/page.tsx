import { ReturnHome } from "@/lib/actions";
import SummaryHandler from "@/ui/SummaryHandler";
import { fetchSummaryItems } from "@/lib/data";

export default async function Page() {
    const fruitArr = await fetchSummaryItems();

  return (
    <div>
        <SummaryHandler fruits={fruitArr}/>
    </div>
  );
}