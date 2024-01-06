'use client';

import React, { useState } from 'react';
import FruitNode from './FruitNode';
import { FruitNodeProps } from './FruitProps';

interface FruitHandlerProps {
    fruits: FruitNodeProps[];
}

var currentQty: number[];
const FruitHandler: React.FC<FruitHandlerProps> = ({ fruits }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    const updateTotalPrice = (id: number, quantity: number) => {
        const selectedFruit = fruits.find((fruit) => fruit.id === id);

        if (selectedFruit) {
            const updatedTotal = totalPrice + quantity * selectedFruit.price;
            setTotalPrice(updatedTotal);

        }
    };

    return (
        <div>
            <div>Total Price: ${totalPrice.toFixed(2)}</div>
            {fruits.map((fruit) => (
                <FruitNode
                    key={fruit.id}
                    id={fruit.id}
                    name={fruit.name}
                    price={fruit.price}
                    quantity={fruit.quantity}
                    updateTotalPrice={updateTotalPrice}
                />
            ))}
        </div>
    );
};

export default FruitHandler;
