import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../index';
import { BlockChainType } from '../../types/BlockChainType';
import { getBlockChain } from '../../api/api';

interface AppState {
    currentChain: BlockChainType;
}

const initialState: AppState = {
    currentChain: [],
};

const AppReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentChain(state, action: PayloadAction<BlockChainType>) {
            state.currentChain = action.payload;
        },
    },
});

export default AppReducer.reducer;

export const { setCurrentChain } = AppReducer.actions;

export const fetchBlockChain = (): AppThunk => async (dispatch) => {
    try {
        const { data } = await getBlockChain();
        dispatch(setCurrentChain(data.blockchain));
    } catch (err) {
        console.log(err);
    }
};
