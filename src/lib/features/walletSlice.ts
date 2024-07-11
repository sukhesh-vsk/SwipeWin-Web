import { createSlice } from '@reduxjs/toolkit'

type WalletBalance = {
    nativeBalance: string;
    tokenBalance: string;
    isTLoading: boolean;
    isNLoading: boolean;
}

const initialState: WalletBalance = {
    nativeBalance: '',
    tokenBalance: '',
    isTLoading: true,
    isNLoading: true
}

export const wallet = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setNativeBalance: (state, action) => {
            state.nativeBalance = action.payload;
        },
        setTokenBalance: (state, action) => {
            state.tokenBalance = action.payload;
        },
        setIsTLoadingBalance: (state, action) => {
            state.isTLoading = action.payload;
        },
        setIsNLoadingBalance: (state, action) => {
            state.isNLoading = action.payload;
        }
    }
})

export const { setNativeBalance, setTokenBalance, setIsNLoadingBalance, setIsTLoadingBalance } = wallet.actions
export default wallet.reducer;
