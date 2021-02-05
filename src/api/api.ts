import axios from 'axios';
import Transaction from '../core/Transaction';
import { BlockType } from '../types/BlockType';

// const server = 'http://0.0.0.0:5000';
const server = 'http://35.158.239.68:5000';

export const getBlockChain = () => {
    return axios.get(server + '/api/blockchain/');
};

export const postTransaction = (transaction: Transaction) => {
    return axios.post(server + '/api/transaction/', {
        transaction: transaction,
    });
};

export const getTransactions = () => {
    return axios.get(server + '/api/transaction/');
};

export const getBalance = (id: string) => {
    return axios.get(server + '/api/wallet/', { params: { id } });
};

export const postMinedBlock = (block: BlockType) => {
    return axios.post(server + '/api/mine/', {
        block: block,
    });
};
