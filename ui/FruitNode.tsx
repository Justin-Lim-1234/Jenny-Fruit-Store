import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { FruitNodeProps } from "../lib/FruitProps";

interface FruitPropsCB extends FruitNodeProps {
    updateTotalPrice: (id: number, name: string, quantity: string) => void;
    checkValidity: (validQty: boolean) => void;
}

const FruitNode: React.FC<FruitPropsCB> = ({ id, name, updateTotalPrice, checkValidity }) => {

    const handleInput = useDebouncedCallback((inputQty: string) => {

        const intQty = parseInt(inputQty);

        if (intQty && !isNaN(intQty)) {
            
            const intQty = parseInt(inputQty);
            updateTotalPrice(id, name, inputQty);
            checkValidity(true);
        }

        else if (!intQty) {
            const intQty = 0;
            updateTotalPrice(id, name, inputQty);
            checkValidity(true);
        }

        else if (isNaN(intQty) && (/^\d*\.?\d*$/.test(inputQty) && !/[a-zA-Z]/.test(inputQty)) || !inputQty) {
            checkValidity(false);
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