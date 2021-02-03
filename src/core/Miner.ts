import Block from './Block';
import { getTransactions } from '../api/api';
import { BlockChainType } from '../types/BlockChainType';

class Miner {
    constructor() {}

    async mine(chain: BlockChainType) {
        const lastBlock = chain[chain.length - 1];
        let transactions;
        try {
            transactions = await getTransactions();
            if (!transactions.data.transactions) {
                return;
            }
        } catch (e) {
            return;
        }

        let nonce = 0;
        let newBlock: Block;

        newBlock = new Block({
            index: lastBlock.index + 1,
            transactions: transactions.data.transactions,
            nonce,
            previous_hash: lastBlock.hash,
        });
        while (true) {
            nonce += 1;
            newBlock = new Block({
                index: lastBlock.index + 1,
                transactions: transactions.data.transactions,
                nonce,
                previous_hash: lastBlock.hash,
            });
            if (newBlock.validatePOF()) {
                newBlock.setHash();
                break;
            }
        }

        return newBlock;
    }
}

export default Miner;
