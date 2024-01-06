'use client';

import { useDebouncedCallback } from "use-debounce";

interface FruitNodeProps {
    id: number;
    name: string;
    price: number;
    qty: number;
}

const FruitNode: React.FC<FruitNodeProps> = ({ id, name, price, qty }) => {

    const handleInput = useDebouncedCallback((inputQty: string) => {
        if (inputQty) {
            const intQty = parseInt(inputQty);
            console.log(`${name}: ${intQty}`);
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