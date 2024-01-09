import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { FruitNodeProps } from "../lib/FruitProps";

interface FruitPropsCB extends FruitNodeProps {
  updateTotalPrice: (id: number, name: string, quantity: string) => void;
  checkValidity: (validQty: boolean) => void;
}

export function FruitNode({
  id,
  name,
  updateTotalPrice,
  checkValidity,
}: FruitPropsCB) {
  const handleInput = useDebouncedCallback((inputQty: string) => { //Use debounced callback to not need to handle user input on every change
    const intQty = parseInt(inputQty);

    if (intQty && !isNaN(intQty)) { //Checking if the input is a number
      const intQty = parseInt(inputQty);
      updateTotalPrice(id, name, inputQty);
      checkValidity(true);
    } else if (!intQty) { //Checking if the field is empty
      const intQty = 0;
      updateTotalPrice(id, name, inputQty);
      checkValidity(true);
    } else if ( //Checking if the field is anything but a number
      (isNaN(intQty) &&
        /^\d*\.?\d*$/.test(inputQty) &&
        !/[a-zA-Z]/.test(inputQty)) ||
      !inputQty
    ) {
      checkValidity(false);
    }
  }, 400);

  return (
    <div id="fnContainer">
      <div id="fnTitle">{name}</div>
      <label id="fnLabel">Enter Quantity:</label>
      <br></br>
      <input id="fnInput" onChange={(e) => handleInput(e.target.value)}></input>
    </div>
  );
}

export default FruitNode;
