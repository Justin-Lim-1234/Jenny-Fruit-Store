'use client';

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

interface FruitNodeProps {
    id: number;
    name: string;
    price: number;
    qty: number;
}

const FruitNode: React.FC<FruitNodeProps> = ({ id, name, price, qty }) => {
    const [quantity, setQuantity] = useState(0);

    const handleInput = useDebouncedCallback((inputQty: string) => {
        if (inputQty) {
            const intQty = parseInt(inputQty);
            setQuantity(intQty);
            console.log(`${name}: ${intQty}`);
        }
        else {
            return 0;
        }
    }, 400);

    return (
        <div id="fnContainer">
            <div id="fnTitle">{name}</div>
            <label id="fnLabel">Enter Quantity:</label><br></br>
            <input id="fnInput" placeholder="0" onChange={(e) => handleInput(e.target.value)}></input>
        </div>
    );
}

export default FruitNode;