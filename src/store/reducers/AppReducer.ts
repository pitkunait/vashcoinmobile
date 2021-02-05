import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../index';
import { BlockChainType } from '../../types/BlockChainType';
import { getBalance, getBlockChain } from '../../api/api';
import { WalletProps } from '../../core/Wallet';

interface AppState {
    currentChain: BlockChainType;
    wallet: WalletProps;
    balance: number;
}

const initialState: AppState = {
    currentChain: [],
    wallet: {
        id: '',
        key: {
            pk: '',
            sk: '',
        },
    },
    balance: 0,
};

const AppReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentChain(state, action: PayloadAction<BlockChainType>) {
            state.currentChain = action.payload;
        },
        setWallet(state, action: PayloadAction<WalletProps>) {
            state.wallet = action.payload;
        },
        setBalance(state, action: PayloadAction<number>) {
            state.balance = action.payload;
        },
    },
});

export default AppReducer.reducer;

export const { setCurrentChain, setWallet, setBalance } = AppReducer.actions;

export const updateEverything = (): AppThunk => async (dispatch) => {
    dispatch(fetchBlockChain());
    dispatch(fetchBalance());
};

export const fetchBlockChain = (): AppThunk => async (dispatch) => {
    try {
        const {
            data: { blockchain },
        } = await getBlockChain();
        dispatch(setCurrentChain(blockchain));
    } catch (err) {
        console.log(err);
    }
};

export const fetchBalance = (): AppThunk => async (dispatch, getState) => {
    const id = getState().app.wallet.id;
    try {
        const {
            data: { balance },
        } = await getBalance(id);
        dispatch(setBalance(balance));
    } catch (err) {
        console.log(err);
    }
};
