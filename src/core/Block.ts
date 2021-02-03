import { BlockType } from '../types/BlockType';
import { TransactionType } from '../types/TransactionType';
import { md } from 'node-forge';

class Block implements BlockType {
    index: number;
    timestamp: number;
    transactions: TransactionType[];
    nonce: number;
    previous_hash: string;
    hash: string;

    constructor(props?: Partial<BlockType>) {
        this.index = props?.index || 0;
        this.timestamp = props?.timestamp || new Date().getTime() / 1000;
        this.transactions = props?.transactions || [];
        this.nonce = props?.nonce || 0;
        this.previous_hash = props?.previous_hash || '';
        this.hash = props?.hash || '';
    }

    serialize(ignore?: (keyof Block)[]) {
        return JSON.stringify(this, (key, value) =>
            ignore?.includes(key as keyof Block) ? undefined : value,
        ).replace(/ /g, '');
    }

    hashBlock() {
        const hashedBlock = md.sha256.create();
        hashedBlock.update(this.serialize(['hash']));
        return hashedBlock.digest().toHex();
    }

    firstHashN(n: number) {
        return this.hashBlock().substring(0, n);
    }

    setHash() {
        this.hash = this.hashBlock();
    }

    static fromSchema(schema: BlockType) {
        return new Block({ ...schema });
    }

    validatePOF() {
        return this.firstHashN(4) === '0000';
    }
}

export default Block;
