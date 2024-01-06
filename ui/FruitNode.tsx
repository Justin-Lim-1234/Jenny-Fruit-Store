'use client';

import { useDebouncedCallback } from "use-debounce";
import { FruitNodeProps } from "./FruitProps";

interface FruitPropsCB extends FruitNodeProps {
    updateTotalPrice: (id: number, quantity: number) => void;
}

const FruitNode: React.FC<FruitPropsCB> = ({ id, name, updateTotalPrice }) => {

    const handleInput = useDebouncedCallback((inputQty: string) => {
        if (inputQty) {
            const intQty = parseInt(inputQty);
            console.log(`${id}: ${intQty}`);
            updateTotalPrice(id, intQty);
        }
        else {
            const intQty = 0;
            console.log(`${id}: ${intQty}`);
            updateTotalPrice(id, intQty);
        }
    }, 400);

    return (
        <div id="fnContainer">
            <div id="fnTitle">{name}</div>
            <label id="fnLabel">Enter Quantity:</label><br></br>
            <input id="fnInput" onChange={(e) => handleInput(e.target.value)}></input>
        </div>
    );
}

export default FruitNode;