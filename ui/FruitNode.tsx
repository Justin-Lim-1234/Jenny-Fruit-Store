'use client';

import { useDebouncedCallback } from "use-debounce";
import { FruitNodeProps } from "../lib/FruitProps";

interface FruitPropsCB extends FruitNodeProps {
    updateTotalPrice: (id: number, name: string, quantity: number) => void;
}

const FruitNode: React.FC<FruitPropsCB> = ({ id, name, updateTotalPrice }) => {

    const handleInput = useDebouncedCallback((inputQty: string) => {
        if (inputQty) {
            const intQty = parseInt(inputQty);
            updateTotalPrice(id, name, intQty);
        }
        else {
            const intQty = 0;
            updateTotalPrice(id, name, intQty);
        }
    }, 600);

    return (
        <div id="fnContainer">
            <div id="fnTitle">{name}</div>
            <label id="fnLabel">Enter Quantity:</label><br></br>
            <input id="fnInput" type="number" onChange={(e) => handleInput(e.target.value)}></input>
        </div>
    );
}

export default FruitNode;