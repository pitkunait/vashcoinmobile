export interface TransactionType {
    id: string;
    sender: string;
    recipient: string;
    amount: number;
    timestamp: number;
    signature: string;
    public_key: string;
}
