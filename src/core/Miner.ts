import Block from './Block';
import { getTransactions } from '../api/api';
import { BlockChainType } from '../types/BlockChainType';
import Transaction from './Transaction';
import { wallet } from './Wallet';

class Miner {
    async mine(chain: BlockChainType) {
        const lastBlock = chain[chain.length - 1];
        let transactions: any[];
        let response;
        try {
            response = await getTransactions();
            if (!response.data.transactions) {
                return;
            }
        } catch (e) {
            return;
        }

        transactions = response.data.transactions;
        const reward = new Transaction({ recipient: wallet.id, amount: 10 });
        transactions.push(wallet.signTransaction(reward));
        const newBlock = new Block({
            index: lastBlock.index + 1,
            transactions: transactions,
            nonce: 0,
            previous_hash: lastBlock.hash,
        });

        while (true) {
            newBlock.nonce += 1;
            if (newBlock.validatePOF()) {
                newBlock.setHash();
                break;
            }
        }

        return newBlock;
    }
}

export default new Miner();
