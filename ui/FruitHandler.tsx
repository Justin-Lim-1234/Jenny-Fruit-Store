'use client';

import React, { useState, useRef, useEffect } from 'react';
import FruitNode from './FruitNode';
import { FruitNodeProps } from '../lib/FruitProps';
import { logTransaction } from '@/lib/actions';

interface FruitHandlerProps {
    fruits: FruitNodeProps[];
}

const FruitHandler: React.FC<FruitHandlerProps> = ({ fruits }) => {
    const prevQtyRef = useRef<number[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [fruitsArr, setFruitsArr] = useState<{ id: number; name: string; quantity: number }[]>([]);

    useEffect(() => {
        prevQtyRef.current = new Array(fruits.length).fill(0);
    }, [fruits]);

    const updateTotalPrice = (id: number, name: string, quantity: number) => {
        const selectedFruit = fruits.find((fruit) => fruit.id === id);

        if (selectedFruit) {
            const prevQty = prevQtyRef.current[selectedFruit.id - 1];
            const updatedTotal = totalPrice + quantity * selectedFruit.price - prevQty * selectedFruit.price;
            prevQtyRef.current[selectedFruit.id - 1] = quantity;
            setTotalPrice((isNaN(updatedTotal) ? 0 : updatedTotal));
        }

        const updateSelectedFruits = fruitsArr.filter((selFruit) => selFruit.id !== id);

        if (quantity > 0) {
            updateSelectedFruits.push({ id, name, quantity });
        }
        setFruitsArr(updateSelectedFruits);

    }

    const logFruits = () => {
        logTransaction(totalPrice, fruitsArr);
        setTotalPrice(0);
        setFruitsArr([]);
    }

    return (
        <div>
            <div id='nodeContainer'>
                <div id='totalLabel'>
                    Total Price: ${totalPrice.toFixed(2)}
                </div>
                <div id='tButton'>
                    <button onClick={logFruits}>Confirm Purchase</button>
                </div>
            </div>

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
