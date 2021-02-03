import { TransactionType } from './TransactionType';

export interface BlockType {
    index: number;
    timestamp: number;
    transactions: TransactionType[];
    nonce: number;
    previous_hash: string;
    hash: string;
}
