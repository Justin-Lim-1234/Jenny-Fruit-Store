'use client';

import React, { useState, useRef, useEffect } from 'react';
import FruitNode from './FruitNode';
import { FruitNodeProps } from '../lib/FruitProps';

interface FruitHandlerProps {
    fruits: FruitNodeProps[];
}

const FruitHandler: React.FC<FruitHandlerProps> = ({ fruits }) => {
    const prevQtyRef = useRef<number[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        prevQtyRef.current = new Array(fruits.length).fill(0);
    }, [fruits]);

    const updateTotalPrice = (id: number, quantity: number) => {
        const selectedFruit = fruits.find((fruit) => fruit.id === id);

        if (selectedFruit) {
            const prevQty = prevQtyRef.current[selectedFruit.id - 1];
            const updatedTotal = totalPrice + quantity * selectedFruit.price - prevQty * selectedFruit.price;
            prevQtyRef.current[selectedFruit.id - 1] = quantity;
            setTotalPrice((isNaN(updatedTotal) ? 0 : updatedTotal));
        }
    };

    return (
        <div>
            <div id='totalLabel'>
                Total Price: ${totalPrice.toFixed(2)}
            </div>

            <button id='tButton'>Confirm Purchase</button>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md-h-full h-vh w-full justify-start rounded-md bg-gray-200 p-3'>
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
        </div>
    );
};

export default FruitHandler;
