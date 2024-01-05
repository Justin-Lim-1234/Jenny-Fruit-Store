interface FruitNodeProps {
    id: number;
    name: string;
    price: number;
    qty: number;
  }

const FruitNode: React.FC<FruitNodeProps> = ({ id, name, price, qty }) => {
    return (
        <div className="fnContainer">
            <div className="fnText">{name}</div>
        </div>
    );
}

export default FruitNode;