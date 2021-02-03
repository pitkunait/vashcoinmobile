import { TransactionType } from '../types/TransactionType';
import { pki } from 'node-forge';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

class Transaction implements TransactionType {
    id: string;
    sender: string;
    recipient: string;
    amount: number;
    timestamp: number;
    signature: string;
    public_key: string;

    constructor(props?: Partial<TransactionType>) {
        this.id = props?.id || nanoid(64);
        this.sender = props?.sender || '';
        this.recipient = props?.recipient || '';
        this.amount = props?.amount || 0;
        this.timestamp = props?.timestamp || new Date().getTime() / 1000;
        this.signature = props?.signature || '';
        this.public_key = props?.public_key || '';
    }

    serialize(ignore?: (keyof Transaction)[]) {
        return JSON.stringify(this, (key, value) =>
            ignore?.includes(key as keyof Transaction) ? undefined : value,
        ).replace(/ /g, '');
    }

    plain() {
        return this.serialize(['signature', 'public_key']);
    }

    verifySignature() {
        const transaction = this.plain();
        const pk = pki.publicKeyFromPem(this.public_key);
        if (this.signature && this.public_key) {
            return pk.verify(transaction, this.signature);
        }
        return false;
    }

    static fromSchema(transaction: TransactionType) {
        return new Transaction({ ...transaction });
    }
}

export default Transaction;
