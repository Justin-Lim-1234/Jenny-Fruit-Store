"use client";

import { SummaryItem } from "@/lib/definitions";
import { ReturnHome } from "@/lib/actions";

interface SummaryProps {
  fruits: SummaryItem[];
}

export default function SummaryHandler({ fruits }: SummaryProps) {

  const DisplaySummary = fruits.map((fruit, index) => ( //Creating a statement out of the fruits that are selected
    <div key={index}>
      {`Added ${fruit.quantity} ${fruit.name}(s) into database.`}
      <br />
    </div>
  ));

  return (
    <div>
      <div id="shContainer">
        <div id="shText">{DisplaySummary}</div> <br></br>
        <div id="shTotal">For a total of ${fruits[0].total_price}</div>
      </div>
      <div>
        <button id="homeButton" onClick={homeClick}>
          Return
        </button>
      </div>
    </div>
  );
}

const homeClick = () => {
  ReturnHome();
};
