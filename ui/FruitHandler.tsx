"use client";

import React, { useState, useRef, useEffect } from "react";
import FruitNode from "./FruitNode";
import { FruitNodeProps } from "../lib/FruitProps";
import { logTransaction } from "@/lib/actions";

interface FruitHandlerProps {
  fruits: FruitNodeProps[];
}

export default function FruitHandler({fruits}: FruitHandlerProps) {
  const prevQtyRef = useRef<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fruitsArr, setFruitsArr] = useState<
    { id: number; name: string; quantity: number }[]
  >([]);
  const [isValid, setIsValid] = useState(true);
  const [fruitValidity, setFruitValidity] = useState(
    new Array(fruits.length).fill(true)
  );
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    prevQtyRef.current = new Array(fruits.length).fill(0);
  }, [fruits]);

  useEffect(() => {
    validCheck();
  }, [fruitValidity]);

  const updateTotalPrice = (
    id: number,
    name: string,
    inputQuantity: string
  ) => {
    const intQty = parseInt(inputQuantity);
    const quantity = isNaN(intQty) ? 0 : intQty;

    const selectedFruit = fruits.find((fruit) => fruit.id === id);

    if (selectedFruit) {
      const prevQty = prevQtyRef.current[selectedFruit.id - 1];

      //Checks the validity of all the inputs to enable/disable the confirm purchase button
      if ( //First check if it is empty or if it is invalid alphabet input
        (isNaN(intQty) && inputQuantity != "") ||
        (!/^\d+$/.test(inputQuantity) && inputQuantity != "")
      ) {
        setFruitValidity((prevValidity) => {
          const newValidity = [...prevValidity];
          newValidity[selectedFruit.id - 1] = false;
          return newValidity;
        });
      } else if (quantity >= 0) { //If not, check if the quantity is more than 0
        const updatedTotal =
          totalPrice +
          quantity * selectedFruit.price -
          prevQty * selectedFruit.price;
        prevQtyRef.current[selectedFruit.id - 1] = quantity;
        setTotalPrice(isNaN(updatedTotal) ? 0 : updatedTotal);

        setFruitValidity((prevValidity) => {
          const newValidity = [...prevValidity];
          newValidity[selectedFruit.id - 1] = true;
          return newValidity;
        });
      } else { //If none of the conditions pass, set to false
        setFruitValidity((prevValidity) => {
          const newValidity = [...prevValidity];
          newValidity[selectedFruit.id - 1] = false;
          return newValidity;
        });
      }
    } else {
      setFruitValidity(new Array(fruits.length).fill(true));
    }

    const updateSelectedFruits = fruitsArr.filter(
      (selFruit) => selFruit.id !== id
    );

    if (quantity > 0) {
      updateSelectedFruits.push({ id, name, quantity });
    }
    setFruitsArr(updateSelectedFruits);
  };

  const noEmptyFields = totalPrice <= 0 ? true : false;

  const validCheck = () => {
    const isAllValid = fruitValidity.every((valid) => valid);
    setIsValid(isAllValid);
  };

  const checkValidity = (validQty: boolean) => {
    setIsValid(validQty);
  };

  const logFruits = () => { //Function that communicates with actions.ts to tell it to log the transaction
    logTransaction(totalPrice, fruitsArr);
    setLogged(true);
    setTotalPrice(0);
    setFruitsArr([]);
  };

  return (
    <div>
      <div id="nodeContainer">
        <div id="totalLabel">Total Price: ${totalPrice.toFixed(2)}</div>
        <div id="tButtonDiv">
          <button
            id="tButton"
            disabled={(noEmptyFields || !isValid) || logged}
            onClick={logFruits}
          >
            Confirm Purchase
          </button>
        </div>
        <div id="textContainer">
          {!isValid && (
            <p id="qtyErrorText">
              Invalid Input(s). Please enter numbers only.
            </p>
          )}
          {logged && (
            <p id="logSuccessText">
              Logging purchase into database...
            </p>
          )}
        </div>
      </div>

      <div id="fNode">
        {fruits.map((fruit) => (
          <FruitNode
            key={fruit.id}
            id={fruit.id}
            name={fruit.name}
            price={fruit.price}
            quantity={fruit.quantity}
            updateTotalPrice={updateTotalPrice}
            checkValidity={checkValidity}
          />
        ))}
      </div>
    </div>
  );
};