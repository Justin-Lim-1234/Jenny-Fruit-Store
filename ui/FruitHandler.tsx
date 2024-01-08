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
    const [fruitsArr, setFruitsArr] = useState<{ id: number; name: string; quantity: number; }[]>([]);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [fruitValidity, setFruitValidity] = useState<boolean[]>(new Array(fruits.length).fill(true));
    const [loading, setLoading] = useState<boolean>(false);
    const [logged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        prevQtyRef.current = new Array(fruits.length).fill(0);
    }, [fruits]);

    useEffect(() => {
        validCheck();
    }, [fruitValidity]);

    const updateTotalPrice = (id: number, name: string, inputQuantity: string) => {

        const intQty = parseInt(inputQuantity);
        const quantity = isNaN(intQty) ? 0 : intQty;
        console.log((/^\d+$/.test(inputQuantity)));

        const selectedFruit = fruits.find((fruit) => fruit.id === id);

        if (selectedFruit) {
            const prevQty = prevQtyRef.current[selectedFruit.id - 1];

            if ((isNaN(intQty) && inputQuantity != "") || (!(/^\d+$/.test(inputQuantity)) && inputQuantity != "")) {
                setFruitValidity((prevValidity) => {
                    const newValidity = [...prevValidity];
                    newValidity[selectedFruit.id - 1] = false;
                    return newValidity;
                });
            }

            else if (quantity >= 0) {

                const updatedTotal = totalPrice + quantity * selectedFruit.price - prevQty * selectedFruit.price;
                    prevQtyRef.current[selectedFruit.id - 1] = quantity;
                    setTotalPrice((isNaN(updatedTotal) ? 0 : updatedTotal));

                    setFruitValidity((prevValidity) => {
                        const newValidity = [...prevValidity];
                        newValidity[selectedFruit.id - 1] = true;
                        return newValidity;
                    });
                

                // if ((/^\d+$/.test(inputQuantity))) {
                //     const updatedTotal = totalPrice + quantity * selectedFruit.price - prevQty * selectedFruit.price;
                //     prevQtyRef.current[selectedFruit.id - 1] = quantity;
                //     setTotalPrice((isNaN(updatedTotal) ? 0 : updatedTotal));

                //     setFruitValidity((prevValidity) => {
                //         const newValidity = [...prevValidity];
                //         newValidity[selectedFruit.id - 1] = true;
                //         return newValidity;
                //     });
                // }

                // else {
                //     setFruitValidity((prevValidity) => {
                //         const newValidity = [...prevValidity];
                //         newValidity[selectedFruit.id - 1] = false;
                //         return newValidity;
                //     });
                // }
            }

            

            else {
                setFruitValidity((prevValidity) => {
                    const newValidity = [...prevValidity];
                    newValidity[selectedFruit.id - 1] = false;
                    return newValidity;
                });
            }
        }
        else {
            setFruitValidity(new Array(fruits.length).fill(true));
        }


        const updateSelectedFruits = fruitsArr.filter((selFruit) => selFruit.id !== id);

        if (quantity > 0) {
            updateSelectedFruits.push({ id, name, quantity });
        }
        setFruitsArr(updateSelectedFruits);
    }

    const noEmptyFields = (totalPrice <= 0) ? true : false;

    const validCheck = () => {
        console.log(fruitValidity);
        const isAllValid = fruitValidity.every((valid) => valid);
        setIsValid(isAllValid);
    }

    const checkValidity = (validQty: boolean) => {
        setIsValid(validQty);
    }

    const logFruits = () => {
        logTransaction(totalPrice, fruitsArr);
        setLogged(true);
        setTotalPrice(0);
        setFruitsArr([]);
    }

    return (
        <div>
            <div id='nodeContainer'>
                <div id='totalLabel'>
                    Total Price: ${totalPrice.toFixed(2)}
                </div>
                <div id='tButtonDiv'>
                    <button id='tButton' disabled={(noEmptyFields || !isValid)} onClick={logFruits}>Confirm Purchase</button>
                </div>
                <div>
                    {!isValid &&
                        <p id='qtyErrorText'>
                            Invalid Input(s). Please enter numbers only.
                        </p>
                    }
                    {logged &&
                        <p id='logSuccessText'>
                            Logging purchase into database and reloading...
                        </p>
                    }
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
                        checkValidity={checkValidity}
                    />
                ))}
            </div>
        </div>
    );
};

export default FruitHandler;
