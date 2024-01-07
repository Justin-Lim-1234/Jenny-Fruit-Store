export type Fruit = {
    id: number,
    name: string,
    price: number,
    quantity: number,
};

export type Transaction = {
    id: number,
    timestamp: string,
}

export type Transaction_Item = {
    id: number,
    transaction_id: number,
    fruit_id: number,
    quantity: number,
    total_price: number,
}